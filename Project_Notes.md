# Project Description


# Features
- as a user I want to choose a department or subject, e.g. African Art, and have palettes generated from objects in that Collection
- as a user I want to have palettes shown in squares
- as a user I want to see information about the art
- as a user I want to be able to save palettes
- as a user I want to see hex values for colours
- as a user I want to be able to copy values to my clipboard
- as a user I want to be able to like color palettes
- random image / colour palette feature with a 'generate' button
- images link to the art institute

# Challenges
I started this project using[The Metropolitan Museum of Art Collection API](https://github.com/metmuseum/) to get images of objects from the collection, but
found calling the API quite slow and more often than not, some requests outright failed. This may be because of needing to make two calls: one to get
object ids and a second to get information for all those ids. It had a 'search' route that allowed for queries, but it required a specific query, e.g. 'cats', and I couldn't just search for everything in the Modern Art department that had an image, for example. If possible, I'd like to revisit this in the future and try to incorporate MoMA again since it is such a rich collection of objects.

As an alternative, I'm now using the [Art Institute of Chicago's API](https://api.artic.edu/docs), which is very well documented, offers data about objects
immediately, a way to define which fields and number of results you want returned. In sum, it gives you a lot more control over the dataset and also allows you to download a data dump if necessary. It's also more reliable and faster than MoMA's API. Oh and I'm filtering the API data based on the field 'colourfulness', which is an abstract measure of colourfulness as a float. I'm making the assumption that the higher the number, the better, in the hopes that the images themselves are bright and vibrant.

To get the colour palettes from the images, I'm using the [use-color-image hook](https://github.com/jeffersonlicet/use-image-color) that returns a user-specified number of colors. Although I find that there isn't the ability to tweak the vibrancy of the colours themselves, so the colours themselves have so far been underwhelming. 

An alternative I'm considering is [React Palette](https://github.com/leonardokl/react-palette) that extracts dominant colours from an image, so I may play with that to compare the results.

This is also the first project I've done using [Tailwind CSS](https://tailwindcss.com), so that I can get a feel for how styling with utility classes works and how customizable it is. I've been hearing a lot about design tokens in the past year, so it would interesting to see if Tailwind CSS would naturally pair with that ooncept.