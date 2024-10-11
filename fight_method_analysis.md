Analyse de la fonction fight()

Le code n'est pas propre car :
	- Il n'est pas performant
	- Il n'est pas lisible
	- Il ne permet pas de faire évoluer une fonctionnalité
	- Il ne facilite pas les tests et les debugs
	- Il ne permets pas de faciliter l'implémentation de nouvelles fonctions

Pour cela, on peut :
	- Renommer les fonctions et variable (ex : init en initGame)
	- Supprimer les commentaires inutiles
	- Extraire les fonctions (ex : partie switch)
	- Supprimer les duplicatas (ex : partie switch)
	- Mieux utiliser les types (ex: fonction newRound, on ne sait pas quels types la fonction retourne)
