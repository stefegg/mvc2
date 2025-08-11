## Getting Started
Pull down the project and then install with the 
```bash
npm i
```
command

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Alternative Startup

Visit https://mvc2.vercel.app/

PLEASE RUN IN FULL SCREEN FOR THE BEST USER EXPERIENCE

## How to Play

Select 3 fighters for each team, then hit your ready button.  You may clear your team selections by hitting reset, hitting random will give you 3 random fighters and clear any current selections.

Each fighter has a type "Architect" "Operator" or "Wildcard" and each type has an advantage over another.  Architect > Operator > Wildcard > Architect.  For each fighter on the opposing team that any one fighter has an advantage over, they get 1 advantage.

Fighters can have a total of 3 advantages, which increase their power exponentially. 

Once both teams hit Ready, you are taken to the Battle Preview screen where you will see how the teams stand up against one another.  You may share the url that this screen generates for you with other users, to share your battle combinations.

When you hit "See Result" - the battle actually takes place.  A final stat is added - Player Skill, which helps determine the winner.

On this final screen you will see the results of the battle!  You will also see the MVP of the battle - this is the fighter on the winning team who had the highest power.  Because of the random nature of player skill - no two battles will come out exactly the same.


## Completion Notes

Things I would add with more time:
- Different fonts / font weights
- Responsiveness
- General code check for semantic correctness ie. not using so many divs
- More borders / color throughout the project, borders that flash when selection takes place
- A seizure warning
- High Score screen
- A back end
- More animation to the battle screen - it wouldn't be hard to get a couple of sprites and have them dance around and smash into each other before you got your results.  I think this would be a really cool effect.
- Sound effects

Speaking of back end - of note is the BattleResultsContext, this really wouldn't exist if this thing had an actual back end.  Having saved battle results would allow the urls of THAT screen to be shared across sections, which would be great, and would allow for something like the High Score Screen.

Of the bonus items I did not complete - I think that the persisting of previous selections would be really easy to add, but I ran out of time.  Drag and drop I purposely did not do here, because given the time constraints my sense was that there was a very real possibility that this feature could take up the entire 8 hours, or at least more of it than I was willing to give.  It's a cool idea though, and would definitely be on the list. I think the use of AI to simulate the battle / generate results was a red herring here, and if someone went for that, you'd basically know to fail them cause that's kind of a bonkers thing to try here with the time limit.  Not as egregious as the drag and drop, but just my thoughts.

With my love of fighting games, completing this project was a joy.  

## Deployment Notes

Any branch pushed to this repo will be deployed to a dev branch on vercel, when they are merged into main then a production deployment takes place.  
