# better-flashcard-racer

- Instructions for frontend environment setup:
    
    - git clone -b dev git@github.com:flanaras/better-flashcard-racer.git
    - cd better-flashcard-racer
    - cd frontend
    - npm install (installs all dependencies)
    - npm install -g mocha
    - mocha --require setup.js ./test/*.spec.js
        - You should see a passing test. If you see an error, something is wrong.
    - npm start
        - starts a browser, http://localhost:3000/
    - to run "watching tests", run:
        - npm test-watch
    - For more info about the dev environment: https://semaphoreci.com/community/tutorials/getting-started-with-tdd-in-react


##GIT WORKFLOW

###Start working on a new feature

- First make sure that you are standing in the "dev" branch.
- Create a new branch, ex "practice-flashcards" (the branch should be off of "dev")
    - git checkout dev 
    - git branch practice-flashcards
- Choose this branch to work on
    - git checkout practice-flashcards
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
   
     
