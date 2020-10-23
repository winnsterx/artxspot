## Roadmap

- [x] Examine and incorporate bchang's Spotify components and style sheets 
- [ ] Fonts alignment
- [x] Button alignment
- [x] Playlist alignment 
- [x] Colour alignment
- [ ] Design and improve Artsy matching algorithm 



## Iteration 3

1. Eliminate critical errors in browser console

2. Test across different browsers

3. Logout

   

## Iteration 2

1. Setting up comparative Spotify aesthetics 
   - Font: circular std
   - [Spotify Profile](https://github.com/bchiang7/spotify-profile/tree/5c8e1f323b7f05482858e4e386db932963dfac87/client/src), by Brittany Chang
     - Could copy her usage of buttons and colours
2. Improve artsy search algorithm
   - Place more or sole emphasis on the song playlist name ?
   - Show different art each time, until cycle begins again

3. App promo, via reddit or sth... 



## Iteration 1

1. Add "another playlist" button
2. Fix "another art" button's access problem
  - Note: Adding in React Router significantly complicated my problem. By sitting down and thinking through my conditional logic clearly, the solution was as easy as setting up 2 hook variables. It also helps to glance at an article titled "React Hooks is set to replace React Router".
3. Fix top-margin in /artwork's image
4. Fix playlists partial background / layout issue
5. Set artwork image size to be relative to window size
6. Set render artwork layout correctly immediately
7. Hook custom URL (artxspot.com) on firebase

