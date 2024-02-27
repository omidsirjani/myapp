// Import puppeteer
const puppeteer =require('puppeteer');
const fs = require('fs');
let scrap = async () => {
  // Launch the browser
  const browser = await puppeteer.launch();

  // Create a page
  const page = await browser.newPage();

  // Go to your site
  await page.goto('https://divar.ir/s/mashhad/buy-apartment');

  // Evaluate JavaScript
  const response = await page.evaluate(() => {
    let items = document.querySelectorAll('.kt-post-card__body');
    let results =[]  ;
    items.forEach(item => {
      let title = item.querySelector('.kt-post-card__info > h2');
      let price = item.querySelector('.kt-post-card__info > div.kt-post-card__description');
      let image = item.querySelector('div.kt-post-card-thumbnail > div:nth-child(1) > picture > img');
      results.push({
        title : title.innerText,
        price : price.innerText,
        image : image.getAttribute('data-src')
    })
    });      
    return results;
  });

  //console.log(response);
  
  // Close browser.
  await browser.close();

  return response;
};

scrap().then((response)=>{
    //console.log(response);
    fs.writeFile('divar.json',JSON.stringify(response),'utf8',()=>{
      console.log('ok');
    })
}).catch((error)=>{
    console.log(error)
})