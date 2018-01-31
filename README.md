
### Running the application
Assuming Node v9.4.0. Run `npm start` or `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

A published version can be found at https://weather-buildit.netlify.com

## Thought Process
### Technology Stack
I chose React.js for its emphasis on reusable components and state management. React also has a rich ecosystem of libraries and tools available. One important example: I used axios to handle API requests. I used CSS modules for component scoped CSS, along side Sass for mixins, &-nesting and variables. I opted for stateless functional components where possible. For a simple application such as this, the App component held all the state, which would not be best practice for a larger application. 

### Data Considerations
The data format from OpenWeatherMap proved an interesting challenge. The data required considerable massaging to get it into a format that is usable for a 5 day forecast. First, I had to create a data model that grouped the hourly forecasts into days, so that the UI could group them in a more user friendly manner. Second, I had to do a second API request to get current weather conditions. I chose to more prominently display the current weather conditions over the subsequent days because the current day is often of most interest when glancing at a forecast. Despite providing a 5 day hourly forecast, the API does not provide high and low temperature for each day.

### User Experience and Design
User input is a critical consideration for a weather app. The API provides city, coordinate, and zip code lookups. I opted for coordinates and zip code. Future version could benefit from city lookup. As an alternative, I use the geolocation API to get the user's current location. The app provides feedback by populating zip code pulled from Google Maps Geotagging API. Given a latitude and longitude, the API returns a likely address, including zip code. I opted to automatically pull current location (which the user can opt out of via browser prompts), to avoid an empty state. If user has location services turned off or denies browser prompt, she can manually enter zip code. A user can enter any valid zip code. Invalid zip codes or API errors will alert the use to try again.

Despite, having deficiencies relative to SVG icons, I used an [icon font](https://websygen.github.io/owfont/) for weather conditions as they fit the aesthetic better than the default icon images served by OpenWeatherMap. In particular, SVG icons would provide better accssibility than icon fonts, allowing for alternative text to describe the weather condition for non-sighted users.

The layout is fully responsive from large screen to tablet size to to mobile phone. I tested in Firefox, Chrome, and Safari on macOS. I also tested on iPhone 7 and iPhone 5 for mobile devices.

## Potential Enhancements
* For speed of development, I held all data in component state of App.js. Better practice would be store API data in Redux and potentially hold that data in local storage for an hour before pulling again. I would like to further investigate the benefits of GraphQL for such data, which intially appears promising to help with the data lookups and manipulation that had to be handled by some of the React components. 
* Provide users with high and low temperature for each day in the forecast. This data is not readily available from the API and needs to be computed from the hourly forecasts. I would need to loop through each hourly forecast and pull out each temperature into an array for the day. Then I could use Math.max() and Math.min() to pull the high and low temperatures.
* Users should also be able to seamlessly lookup address, city, or zip code to be more consistent with other applications. 
* A more comprehensive solution would be to map a set of SVG icons to the OpenWeatherMap IDs for conditions, to avoid the pitfalls of icon fonts. 
