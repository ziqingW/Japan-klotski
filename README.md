# Japanese Klotski Puzzle
<a href='https://en.wikipedia.org/wiki/Klotski' rel='noopener noreferrer' target='_blank'>Klotski</a> is a sliding block puzzle thought to have originated in the early 20th century. The name may refer to a specific layout of ten blocks, or in a more global sense to refer to a whole group of similar sliding-block puzzles where the aim is to move a specific block to some predefined location. In this Japanese version, the goal is to help the Daughter which is the red block <span style='color: red;'><b>(娘)</b></span> escape from all kinds of pressures from the traditional family and society to the EXIT.

## How to play
1. Move the block one grid at one time by dragging and dropping. 
2. Otherwise, the game would be forced to retreat to the previous stored layout. 
3. Make the biggest block(娘) to the EXIT and you win it! 
___
## Nerd's thinking
### Gains:
- It's my first React project working with draggable elements 
- In the beginning I thought it was impossible to complete, thanks to the React-Grid-Layout I can freely drag and drop any grids in the end

### Pains:
- Due to the lack of documentaion of React-Grid-Layout, it was very hard to catch the correct timing for updating state 
- Also, several features were hard to implement as the boundary for the grids' moving range or rules to restrict moving mode 
- I had to work around by restricting moving block only one grid at one time, otherwise the game would be forced refresh with the layout as the last step, which hurt user's experience badly 
- And the drag gesture was a nightmare on ios that the whole page was moving elasticly by moving the block 
- After a long time of searching and trial, I overcame it by using 'body-scroll-lock' which can lock body part of the page 

## Languages:
- React 
- React-Grid-Layout 
- Material-ui 
- body-scroll-lock

## Published:
GitHub Page
