
### Running the application
Assuming Node v9.4.0. Run `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


### Thought Process
I chose React.js for it's emphasis on reusable components and state management. It has a rich ecosystem of helpful libraries and tools that I employed for this project. For instance, I used axios to handle API requests. I used CSS modules for of component scoped CSS, along side Sass for mixins, &-nesting and variables. I opted for stateless functional components where possible. For a simple application, the App component held all the state. Despite, having deficiencies relative to SVG icon, I used an [icon font](https://websygen.github.io/owfont/) for conditions as they fit the aesthetic better than the default icon images served by OpenWeatherMap.  

The data format from OpenWeatherMap proved an interesting challenge. The data required considerable massaging to get it into a format that is usable for a 5 day forecast. First, I had to create a data model that grouped the hourly forecasts into days, so that the UI could be group them in a fashion that is user friendly. Second, I had to do a second API request to get current weather conditions. I chose to more prominently display the current weather conditions over the subsequent days because the current day is often of most interest when glancing at a forecast.

User input was another critical consideration for a weather app. The API provides city, coordinate, and zip code lookups. I opted for coordinates and zip code.  When using browser location, I chose to provide feedback in the form of populating zip code that I pulled from Google Maps Geotagging API. Given a latitude and longitude, the API returns a likely address, including zip code. I opted to automatically pull current location (which the user can opt out via browser prompts), to avoid an empty state.

The layout is fully responsive from large screen through tablet size and down to mobile phone.

### Potential Enhancements
For speed of development, I held all data in local component state in App. I would enhance the application by pushing API data to Redux and potentially holding that data in local storage for an hour before pulling again. GraphQL would certainly help with the data lookups and manipulation that had to be handled by some of the React components. Users should also be able to seamlessly lookup address, city, or zip code to be more consistent with other applications. A more comprehensive solution would be to map a set of SVG icons to the OpenWeatherMap IDs for conditions, to avoid the pitfalls of icon fonts. 