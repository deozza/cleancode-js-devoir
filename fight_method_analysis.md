1. Fail Fast : Les vérifications if(hasInit), if(hasRound) et if(!hasFought) peuvent être réorganisées pour suivre le principe du fail fast. Cela rend le code plus lisible en éliminant les niveaux d'indentation inutiles.

2. Commentaires inutiles : Les commentaires reset weapon list so the enemy could play et health cannot be negative sont innutiles car le code est suffisamment excplicite (les commentaires sont donc innutiles)

3. Taille de la fonction : La fonction excedes les 72 lignes de code elle est donc trop longue

4. Une chose à la fois : La fonction fait plusieurs choses or la fonction ne doit faire qu'une seule chose.