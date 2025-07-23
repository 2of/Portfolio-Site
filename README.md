# 🚀 My Portfolio Site

[![GitHub Pages](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=live&url=https%3A%2F%2F2of.github.io%2FPortfolio-Site%2F)](https://2of.github.io/Portfolio-Site/)

Welcome to my portfolio site — a project that started out simple but spiraled into something a lot more complex (in a fun way). It's still a **work in progress**, but it's **live**, it's **React-based**, and it's already hosting articles and tools.

### 🔗 Check it out:
🌐 **Live site:** [2of.io](https://2of.io)  
📄 **Example article:** [2of.io/#/proj/geo](https://2of.io/#/proj/geo)

---

## 🛠️ What's in the box?

- 🧠 A custom JSON format for embedding articles, data, images, and other structured content  
- 📝 A basic article editor (accessible via **/settings → Open Editor**)  
- 🧩 ~60% of a reusable UI component library (you’ll spot the patterns!)  
- 📦 All built with React, using SCSS for styling and a handful of custom hooks/context

---

## ✍️ Why?

Started off just wanting to host my thesis and a few projects…  
Now it’s a mini CMS with its own JSON structure and editing interface. Whoops.

---

## ⚠️ Current TODOs

- [ ] Refactor article handling to use a reducer  
- [ ] Fix Firefox column rendering issues  
- [ ] Fix Safari iOS 16+ padding bug  
- [ ] File open bugs as GitHub issues

---

##  Notes

I wanted to learn react, so here we go. 

## Responsive

It's a fully responsive site, the mobile view is ~tiktok inspired.


## Scss + REACT + JS ... 

It's also a little Loosey-goosey (it's a personal site) so there's not much in the way of interfaces or types or such. Likewise not much in the way of comments and it's pretty loosely organized


## 📌 Main Things

- **`routes.jsx`**  
  Handles page routing, including background setup and page loading behavior.

- **`metadata.json`**  
  - Contains metadata for everything shown on `/projects` (aside from external API content).  
  - Includes references to the full `text.json` files for each article/write-up.  
  - Manually maintained.

- **Article handling**  
  - Articles can be loaded from local or external sources.  
  - The app checks for valid JSON and type safety before rendering.  
  - If there's an issue, it logs the error but fails gracefully — nothing breaks.

- **Assets**  
  All images are sourced from Unsplash or other open domain resources.

- **Responsive design**  
  Looks **best on mobile** right now — desktop styling is in progress.

---
 
Yeah, that's all! (It's not there's oodles of things in there)





## Chrome (Happy) Webkit (mostly happy) Firefox (Very upset and causing me headaches)
You might see bugs in FF
---
# It's a lot more complex than it looks.
There's a bunch of fancy contexts, react portals, providers and middleware in there. 

There's a whole markup language defined for the 'articles' in /projects (and also on the homepage)




#### Data is therefore just popped into /src/assets (not public) gh pages is enough of a repo to not bother hosting elsewhere

best way to convert text to the schema is using an LLM

```javascript
{
  "name": "exampleProject",
  "title": "Example Project",
  "subtitle": "A demonstration of all supported content types.",
  "heroImage": "/assets/images/example-hero.png",
  "heroLinks": [
    {
      "title": "View Article",
      "type": "Article",
      "to": "/articles/example"
    },
    {
      "title": "Source Code",
      "type": "Code",
      "to": "https://github.com/example/project"
    }
  ],
  "sections": [
    {
      "name": "Paragraph Section",
      "items": [
        {
          "type": "paragraph",
          "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum."
        }
      ]
    },
    {
      "name": "Image Section",
      "items": [
        {
          "type": "image",
          "src": "/assets/images/sample-image.jpg",
          "alt": "Sample image showing lorem ipsum context."
        }
      ]
    },
     {
      "name": "Data Section",

      "items": [
        {
          "type": "data",
          "datapoints": [
            {
              "overallLabel": "first Sample",
              "type": "linear_bar",
              "data" : 
              [{
                "label": "label 1 ",
              "upperBound": 100,
              "lowerBound": 0,
              "value": 13},
            
            {
                "label": "another" ,
              "upperBound": 100,
              "lowerBound": 0,
              "value": 33}
            ]
            },  {
              "overallLabel": "second area",
              "type": "radial",
              "data" : 
              [{
                "label": "radial 1",
              "upperBound": 100,
              "lowerBound": 0,
              "value": 33},
            
            {
                "label": "radial 2",
              "upperBound": 100,
              "lowerBound": 0,
              "value": 62}
            ]
            },            {
              "overallLabel": "first Sample",
              "type": "linear_bar",
              "data" : 
              [{
                "label": "label 1 ",
              "upperBound": 100,
              "lowerBound": 0,
              "value": 13},
            
            {
                "label": "another" ,
              "upperBound": 100,
              "lowerBound": 0,
              "value": 33}
            ]
            }
          ]
        }
      ]
    } ,
    {
      "name": "Pills Section",
      "items": [
        {
          "type": "pills",
          "pills": ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"]
        }
      ]
    }, {
      "name": "Grid Section",
      "items": [
        {
          "type": "grid",
          "rows": [{
            "label":"Label Here",
            "value" : 123
          },{
            "label":"Label Here",
            "value" : 123
          }]
        }
      ]
    },
    {
      "name": "Highlight Section",
      "items": [
        {
          "type": "highlight",
          "text": "This is a highlighted phrase meant to draw attention."
        }
      ]
    },
    {
      "name": "Link Section",
      "items": [
        {
          "type": "link",
          "text": "Read more about lorem ipsum here:",
          "label": "Click Here",
          "to": "https://example.com/lorem-ipsum"
        }
      ]
    },
    {
      "name": "Code Section",

      "items": [
        {
          "type": "code",
          "language": "javascript",
          "content": "function loremIpsum() {\n  console.log('Lorem ipsum dolor sit amet.');\n}"
        }
      ]
    }
   
  ],
  "link": {
    "text": "Back to projects",
    "url": "/projects"
  }
}

  

```

