
## IDE
This project use Intelij as an IDE, can download at https://www.jetbrains.com/idea/

## REST API Documentation
This project use swagger as the API documentation, can see the documentation of Better FlashCard Racer api at https://app.swaggerhub.com/api/better-flashcard-racer/testar/1.0.0
##GIT WORKFLOW

###Start working on a new feature

Are you starting to work on a subtask within a feature/user story? Check if there is already an open branch for the feature. If there is, move down to "Start work on an existing feature", do not create a separate branch.

An example:
- I want to start on the task "Add option to select game length: Either number of problems or a time limit.", which is one of the tasks in the checklist "S03. Practice flashcards"
- First, I add myself as a member to the card and move it to "In progress" on Trello
- Then I want to start working, so I check if there is a existing branch named something like "S03", or "practice-flashcards"
- If I find branch, then continue with the instructions at "Start working on an existing feature". If not, move on to the instructions below.


- First make sure that you are standing in the "dev" branch.
- Create a new branch, ex "practice-flashcards" (the branch should be off of "dev")
    - git checkout dev 
    - git branch practice-flashcards
- Choose this branch to work on
    - git checkout practice-flashcards
- As soon as possible, do a first add, commit and push, so that the branch can be seen by everyone else (to minimize others creating duplicate branches)
1. Do work...
    - git add ....
    - git commit -m "Working..."....
    - git add ...
    - git commit -m "More work locally..." ..
2. When you are at a good "break point", do a pull using REBASE (NOT MERGE!)
    - git pull --rebase origin practice-flashcards
    - If there are conflicts: Look at the files where there are conflicts (much easier in an IDE like intellij or webstorm), and choose what to remove and change
    - After all conflicts have been resolved, the pull should be successful
3. Push your merged changes to the practice-flashcards
    - git push -u origin practice-flashcards
    - (The next time you push the upstream is set to practice-flashcards, so you can just type: git push)
    - All your commits and changes are now in the practice-flashcards branch, and everyone will get your changes when doing pull
- If there is more tasks to be done on the feature, repeat from 1.

###Start work on an existing feature

Are you starting a subtask within practice-flashcards? Then follow this.

- Choose the feature branch to work on
    - git checkout practice-flashcards
1. Do work...
    - git add ....
    - git commit -m "Working..."....
    - git add ...
    - git commit -m "More work locally..." ..
2. When you are at a good "break point", do a pull using REBASE (NOT MERGE!). Rebase will make the git history a "straight-line".
    - git pull --rebase origin practice-flashcards
    - If there are conflicts: Look at the files where there are conflicts (much easier in an IDE like intellij or webstorm), and choose what to remove and change
    - After all conflicts have been resolved, the pull should be successful
3. Push your merged changes to the practice-flashcards
    - git push -u origin practice-flashcards
    - (The next time you push the upstream is set to practice-flashcards, so you can just type: git push)
    - All your commits and changes are now in the practice-flashcards branch, and everyone will get your changes when doing pull
- If there is more tasks to be done on the feature, repeat from 1.

###Feature branch is considered done

When the feature is done and we want to merge the feature branch with dev, ex practice-flashcards

- Go to our repo on github.com (the web ui), and go into the branch practice-flashcards
- When standing in the practice-flashcards, click "New pull request"
- If there are any conflicts, abort.
    - Handling conflicts:
        - Move over to intellij
        - checkout practice-flashcards
        - merge practice-flashcards with dev. IMPORTANT! Choose MERGE, NOT REBASE!
        - resolve all the conflicts
        - Go to github.com
        - Go to practice-flashcards, click "New pull request"
        - Should not be any conflicts now
- Accept or reject the pull request on dev
        
               
###Feature is considered done done

Not 100% sure, but something like:

- Create a "pull request" from dev to master
- We should now be able to choose which features on dev that we want to include when checking out the "pull request"
- Pull only the features that got accepted at the scrum review
- Should never be any conflicts when doing this
   
     
