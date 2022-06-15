1) "npm install -g firebase-tools", then
2) "npm run start" 

There are 2 end-points:

create/update user: 
http://localhost:5001/test-audience-78739/us-central1/createUser

example req: 
body: {
    name: "Domitos"
    age: 21,
    score: 505,
}

Anything will be valid except if we try to update number fields with string values (or something that will cast NaN)
In that case there will be an error:
{
    "response": "error",
    "message": "score should be a number"
}

///////////

get user by userId: 
http://localhost:5001/test-audience-78739/us-central1/getUserById

possible errors: 

{
    "response": "error",
    "message": "you should fill userId in query"
}
{
    "response": "error",
    "message": "User was not found"
}