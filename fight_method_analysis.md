This method hasn't been written with clean coding in mind and here's why :

1. There are too many booleans. It's better to avoid having too much booleans entries because it leads to very long ifs brackets that make it harder to read and understand. You usually want to create another function for these types of checks, which leads to the next issue.
2. The fight() function is doing too many things at once. Because of that the intent isn't clear, and it's harder to tell which block is doing what feature. We have to separate each feature so each of them are handled by a function.
3. The ifs and switch cases, there's too many of them and their purpose isn't obvious at first glance. Some of them will be turned into function, some will be modified to become fail fast (handling the case where something goes wrong first).
4. Too many comments without purpose. Some of them even repeat the same thing. These comments are there because the code isn't clean; they will be removed upon refactoring.