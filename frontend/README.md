#Instructions for frontend environment setup:
    
    - git clone -b dev git@github.com:flanaras/better-flashcard-racer.git
    - cd better-flashcard-racer
    - cd frontend
    - npm install (installs all dependencies)
    - npm install -g mocha (installs the javascript test framework globaly on your comp)
    - mocha --require setup.js ./test/*.spec.js
        - You should see a bunch of passing/failing test. If you see an error, something is wrong.
    - npm start
        - Starts the development server, and should open a browser with url http://localhost:3000/
        - Any changes to javascript files in ./src will automatically restart the dev server with the changes.
    - npm test-watch
        - To run "watching tests"
        - Tips:
            When developing, have one terminal open with the dev server, and one terminal with the "wathcing tests"
            This way, you can easily do TDD, by writing a new test case in test/components.spec.js, see it failing,
            and then implement the code in your component in src.
    - For more info about the dev environment: https://facebook.github.io/react/blog/2016/07/22/create-apps-with-no-configuration.html 
   
#### To build the project:
    - npm run build (standing in the root of the frontend directory, same dir as package.json)
        - The project has now been built in the folder 'build', and can be deployed and served as a 'normal' HTML file.

- More instructions regarding test framework, etc:
    - Documentation for the airbnb:s React framework Enzyme: http://airbnb.io/enzyme/docs/api/
    - Documentation for the sinon: http://sinonjs.org/
    - Documentation for the mocha: https://mochajs.org/

- All frontend components get the HTTP REST API URL, and the Socket URL, from frontend/config.json. If you want to point the frontend to a new URL, change config.json.
    
    
######Instruction validity checked 170312 by John Tunell)

