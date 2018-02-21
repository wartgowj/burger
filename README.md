# Burger

A simple app utilizing Node, Express, Mysql, and handlebars.


**Burger List**

Pulls the list of undevoured burgers from mysql database.
Handlebars renders this info onto the page in the burgers list.

**EAT ME** button changes devoured value to true.

Once devoured value is true, Burgers move to the Devoured Burger List.


**Devoured Burger List**

Pulls the list of devoured burgers from the mysql database.
Handlebars renders this info onto the page in the devoured list.

**DELETE ME** button deletes this item from the database completely.


**Order a Burger**

Excepts user text input. This input is used to create a new burger in the mysql database.

