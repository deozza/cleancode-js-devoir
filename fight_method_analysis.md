### Analysis of the fight function:

- Firstly, the fight function take way too many arguments.

- The function works with an "if tree" but without the failfirst methodology.

- Thoses if works with boolean in arguments wich is not really reliable.

- some of the "if" could've been other functions because they'll be call many times.
  On top of that thoses if needs comments in order to know their purposes.

- There is a switch case for the type of weapons the characters can have but it's not handling cases very well since if it doesn't fit it just throw an error.
  And the switch case is written twice where it could've been a function or method.

### Fix the fight function:

First thing i would do is create function for all the features repeated multiples times throught the game:

- Choosing weapons, calculating health before and after damages.

- Create classes: for Players, and for Fight. Fight woul inherit the weapons.
