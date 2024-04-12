# niels.photos

This is a project for a photo portfolio page. An online example can be seen at [https://niels.photos](https://niels.photos).

The photo page uses Microsoft Onedrive as a backend. The frontend takes a single parameter, which is the public sharing URL for a Onedrive album.

## Getting Started

1. Create a directory on Onedrive. Take the following into account:
    -   This is meant to be used with a _directory_, not a Onedrive photo album. 
    -   The directory you share is the root album of the photo page. You can add one level of albums to that. 
    -   The title of the sub albums (= sub directories of the root) will be used as the album titles on the front page
    -   The descriptions of the albums will appear on top of the album page. 
    -   The descriptions of the photos will appear below the images when you enlarge them. 

2. Create a public share link for the root directory. Make sure you set it to _read only_.

3. Build this project by running `npm run build` and host the resulting project somewhere. 

4. Set an environment variable called `VUE_APP_SHARE_URL`, containing the Onedrive share URL you created. 



