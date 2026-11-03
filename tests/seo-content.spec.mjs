import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import TurndownService from 'turndown';
const routes=['/auto-insurance/','/home-insurance/','/renters-insurance/','/commercial-insurance/','/life-insurance/','/es/seguro-de-auto/','/es/seguro-de-vivienda/','/es/seguro-de-inquilinos/','/es/seguro-comercial/','/es/seguro-de-vida/'];
test.beforeEach(async ({page})=>{await page.route('https://www.googletagmanager.com/gtm.js**',route=>route.fulfill({body:''}));});
for(const route of routes) test(`coverage comparison is readable and localized ${route}`,async({page},info)=>{
  test.skip(info.project.name!=='chromium','All routes and sizes once; representative cross-engine checks below.');
  for(const width of [320,390,768,1440]){
    await page.setViewportSize({width,height:1000});await page.goto(route,{waitUntil:'networkidle'});
    const table=page.locator('.coverage-comparison');await table.scrollIntoViewIfNeeded();
    await expect(table.locator('caption')).not.toBeEmpty();await expect(table.locator('th[scope="col"]')).toHaveCount(2);
    await expect(table.locator('tbody tr')).toHaveCount(route.includes('vida')||route.includes('life')?2:3);
    await expect(table.locator('thead th').last()).toHaveText(route.startsWith('/es/')?'Qué revisar':'What to check');
    const fits=await table.evaluate(el=>({page:document.documentElement.scrollWidth<=innerWidth+1,table:el.getBoundingClientRect().right<=innerWidth+1&&el.getBoundingClientRect().left>=0}));
    expect(fits,{message:route+' '+width}).toEqual({page:true,table:true});
    if (width >= 1100) {
      const grid = page.locator('.service-detail .detail-grid').first();
      const layout = await grid.evaluate(el => ({
        width: el.clientWidth,
        gap: parseFloat(getComputedStyle(el).columnGap),
        cards: [...el.children].map(card => ({left: card.offsetLeft, top: card.offsetTop, width: card.offsetWidth}))
      }));
      expect(new Set(layout.cards.map(card => card.top)).size, route).toBe(1);
      expect(Math.abs(layout.cards.reduce((sum, card) => sum + card.width, 0) + layout.gap * (layout.cards.length - 1) - layout.width), route).toBeLessThan(3);
    }
    await expect(page.locator('h1')).toHaveCount(1);
  }
});
for (const route of ['/', '/es/']) test(`coverage cards form complete aligned rows ${route}`, async ({page}) => {
  test.setTimeout(60_000);
  for (const width of [320, 768, 1096, 1440, 1920]) {
    await page.setViewportSize({width, height: 1000});
    await page.goto(route, {waitUntil: 'domcontentloaded'});
    const cards = page.locator('.coverage-grid > .coverage-card');
    await expect(cards).toHaveCount(8);
    const sizes = await cards.evaluateAll(nodes => nodes.map(el => ({left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight})));
    if (width >= 700) {
      for (let i = 0; i < sizes.length; i += 2) {
        expect(sizes[i].top).toBe(sizes[i + 1].top);
        expect(Math.abs(sizes[i].width - sizes[i + 1].width)).toBeLessThan(2);
        expect(Math.abs(sizes[i].height - sizes[i + 1].height)).toBeLessThan(2);
      }
    } else expect(new Set(sizes.map(card => card.left)).size).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    if (width >= 900) {
      const heights = await page.locator('#quote > *').evaluateAll(nodes => nodes.map(el => el.offsetHeight));
      expect(Math.abs(heights[0] - heights[1])).toBeLessThan(2);
    }
  }
});
test('new life content has no serious accessibility issues and matches FAQ schema',async({page})=>{
  for(const route of ['/life-insurance/','/es/seguro-de-vida/']){
    await page.setViewportSize({width:390,height:1000});await page.goto(route,{waitUntil:'networkidle'});
    await page.locator('.coverage-comparison').scrollIntoViewIfNeeded();
    await expect(page.locator('.coverage-comparison').getByRole('rowheader')).toHaveCount(2);
    await expect(page.locator('.coverage-comparison').getByRole('columnheader')).toHaveCount(2);
    const audit=await new AxeBuilder({page}).include('main').analyze();
    expect(audit.violations.filter(x=>['serious','critical'].includes(x.impact))).toEqual([]);
    const parsed=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(n=>JSON.parse(n.textContent)).flatMap(x=>x['@graph']||[x]));
    const faq=parsed.find(x=>x['@type']==='FAQPage');expect(faq.mainEntity).toHaveLength(9);
    expect(faq.mainEntity.some(x=>/living benefits|beneficios en vida/i.test(x.name))).toBe(true);
    expect(faq.mainEntity.some(x=>/Broward/.test(x.name))).toBe(true);
  }
});
test('statewide service facts preserve the single Miami office',async({request})=>{
  for(const route of ['/','/es/','/about-office-3/','/es/sobre-oficina-3/']){
    const response=await request.get(route);expect(response.status()).toBe(200);const html=await response.text();
    const nodes=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
    const agency=nodes.find(x=>x['@type']==='InsuranceAgency');expect(agency.address.addressLocality).toBe('Miami');
    expect(agency.areaServed).toEqual(expect.arrayContaining(['Florida','Miami-Dade County','Broward County']));
    expect(html).toContain('L134140');
  }
  const metadata=await request.get('/api/site.json');expect((await metadata.json()).service_areas).toEqual(expect.arrayContaining(['Florida','Broward County']));
});

test('AI-readable Markdown preserves comparison rows and real poster URLs',async({request})=>{
  for(const [route,heading] of [['/life-insurance/','| Policy type | What to check |'],['/es/seguro-de-vida/','| Tipo de póliza | Qué revisar |']]){
    const response=await request.get(route,{headers:{Accept:'text/markdown'}});
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
    const text=await response.text();
    expect(text).toContain(heading);
    expect(text).toContain('| --- | --- |');
    expect(text).toContain('/media/carousel/life/');
    expect(text).not.toContain('data:image');
  }
});

test('visible FAQ answers and links match schema on every page',async({request},info)=>{
  test.skip(info.project.name!=='chromium','HTTP content check is independent of browser engine.');
  const converter=new TurndownService();
  const plain=value=>converter.turndown(value).replace(/\s+/g,' ').trim();
  const sitemap=await(await request.get('/sitemap.xml')).text();
  for(const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)){
    const route=new URL(match[1]).pathname;
    const html=await(await request.get(route)).text();
    const main=plain(html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1]);
    const nodes=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']||[x]});
    for(const question of nodes.find(x=>x['@type']==='FAQPage')?.mainEntity||[]){
      expect(main,route+' '+question.name).toContain(plain(question.name));
      expect(main,route+' '+question.name).toContain(plain(question.acceptedAnswer.text));
    }
  }
});
