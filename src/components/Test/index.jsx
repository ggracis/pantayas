import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";

export const PersonComponent = () => {
  // State variables
  const [person, setPerson] = useState(null);

  async function addPerson() {
    try {
      // create a new Parse Object instance
      const Person = new Parse.Object("Person");
      // define the attributes you want for your Object
      Person.set("name", "John");
      Person.set("email", "john@back4app.com");
      // save it on Back4App Data Store
      await Person.save();
      alert("Person saved!");
    } catch (error) {
      console.log("Error saving new person: ", error);
    }
  }

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Person");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("name", "John");
    // run the query
    const Person = await query.first();
    // access the Parse Object attributes
    console.log("person name: ", Person.get("name"));
    console.log("person email: ", Person.get("email"));
    console.log("person id: ", Person.id);
    setPerson(Person);
  }

  return (
    <div>
      <button onClick={addPerson}>Add Person</button>
      <button onClick={fetchPerson}>Fetch Person</button>
      {person !== null && (
        <div>
          <p>{`Name: ${person.get("name")}`}</p>
          <p>{`Email: ${person.get("email")}`}</p>
        </div>
      )}
    </div>
  );
};
