# better-flashcard-racer

- Instructions for frontend environment setup:
    
    - git clone -b dev git@github.com:flanaras/better-flashcard-racer.git
    - cd better-flashcard-racer
    - cd frontend
    - npm install (installs all dependencies)
    - npm install -g quik
    - npm install -g mocha
    - mocha --require setup.js ./test/*.spec.js
        - You should see a passing test. If you see an error, something is wrong.
    - cd src
    - quik
        - You should see a browser window appear with the text "Hi." If that doesn't appear, try refreshing the browser, or restarting quik. The application should be displayed on http://localhost:3030/
    - For more info about the dev environment: https://semaphoreci.com/community/tutorials/getting-started-with-tdd-in-react

