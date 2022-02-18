# Intro
A website to explore colour palettes generated from artworks found in the collection at the Art Institute of Chicago using their API. This project is not affiliated with @art-institute-of-chicago.

# Setup
Clone the repo, cd into the project folder and run `npm start`. The site will be running locally at [http://localhost:3000](http://localhost:3000).

It's also been deployed with Netlify. Give it a go: [https://keen-beaver-bf6883.netlify.app/](https://keen-beaver-bf6883.netlify.app/)

# Challenges
I started this project using[The Metropolitan Museum of Art Collection API](https://github.com/metmuseum/) to get images of objects from the collection, but
found calling the API quite slow and more often than not, some requests outright failed. This may be because of needing to make two calls: one to query for
object ids and a second to get information for all those ids. It had a 'search' route that allowed for queries, but it required a specific query, e.g. 'cats', and I couldn't just search for everything in the Modern Art department that had an image, for example. If possible, I'd like to revisit this in the future and try to incorporate MoMA again since it has such a rich collection of objects.

I'm now using the [Art Institute of Chicago's API](https://api.artic.edu/docs), which is very well documented, offers data about objects
immediately w/o querying for ids, a way to define _which_ fields and number of results you want returned. In sum, it gives you a lot more control over the dataset and also allows you to download a data dump if necessary. The data also included a 'pagination' field that included the api url for the next or previous set of data. It's also more reliable and faster than MoMA's API. Oh and I'm filtering the API data based on the field 'colourfulness' that's included, which is an abstract measure of colourfulness as a float, which is incredibly helpful. I'm making the assumption that the higher the number, the better, in the hopes that the images themselves are bright and vibrant.

I originally used [use-color-image hook](https://github.com/jeffersonlicet/use-image-color) oo get the colour palettes from the images. Although I found that there isn't the ability to tweak the vibrancy of the colours themselves, so the colours have so far been underwhelming. 

As an alternative to that, I'm now using [React Palette](https://github.com/leonardokl/react-palette) that extracts dominant colours from an image and the result is more varied palettes, but it still misses the more eye-catching colours.

This is also the first project I've done using [Tailwind CSS](https://tailwindcss.com), so that I can get a feel for how styling with utility classes works and how customizable it is. I've been hearing a lot about design tokens in the past year, so it would interesting to see if Tailwind CSS would naturally pair with that concept.

- Pagination
  - first try: arrows on either side of the screen to go forward/back. Not great on mobile or tablet screens, maybe on those screens have a bottom nav with forward/back buttons

- Semantic HTML
  - what would be the correct tags for a toast notification? Aside? Strong? A plain ol' div?

# Design/Code Todos
[] DRY up data fetching, maybe create a custom hook for fetching/filtering data since initial fetch and fetching the next/prev page actions are identical
[] fix issue where hex value colour isn't visible on dark backgrounds
[x] fix issue when there is only one card - current bug shows the card broken up into three columns -> col 1 is the title, 2 the image, three the palette
[] add footer
[x] get colour palette hex to display - hover over the colour, have the square expand and the colour hex value appear, copy the hex to the clipboard on click, see coolors for an example of the expected behaviour
[] while content is loading show skeleton content
[] link to the ArtIC page if available
[] link to wiki pages for artist info - potentially find more info about the pages (look at API docs if links are provided a la MoMA)
  - show info as a tooltip? Like on the Criterion Channel for movie info?
[] random artwork generator
[] search bar
[x] next / prev page arrows - have the arrows on the right and left side of the screen and accessible at any time on larger screens, hidden on mobile
  - for now, settled on having arrows at the top and bottom of the page, since this was the solution that would work on all devices
[x] display a toast message when the hex has been successfully copied
[x] replace hex value with a checkmark icon on copy
[] dark mode

# Features
[] as a user I want to search by colour, filter by type of art
[x] as a user I want to have palettes shown in squares
[] as a user I want to see information about the art
[] as a user I want to be able to save palettes
[x] as a user I want to see hex values for colours
[x] as a user I want to be able to copy values to my clipboard
[] as a user I want to be able to like color palettes
[] images link to the art institute