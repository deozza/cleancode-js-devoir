# Analyse de la fonction fight()

- **Méthode longue** :
  La fonction est trop longue et fait trop de choses, une méthode doit faire une seule chose. Décomposer en plusieurs fonctions et qui n'effectue qu'une seule tâche.

- **Conditions imbriquées** :
  La fonction a des conditions imbriquées très profondes qui la rendent difficile à lire et à comprendre. Utiliser le principe “failFast” et faire les tests d’échec en premier pour éviter d'utiliser des conditions imbriquées.

- **Code répétitifs** :
  Les deux instructions switch sont identiques. Extraire la logique des instructions switch et les conditions dans des méthodes séparées.

- **Instructions switch** :
  L'utilisation des instructions switch est à bannir, il est difficile d'ajouter de nouveaux cas sans modifier le code existant. Utiliser un objet de mapping ou du polymorphisme avec une interface.

- **Multiples types de retour** :
  La méthode renvoie un tableau avec des types mélangés, ce qui peut conduire à des erreurs. Utiliser un type de retour cohérent, comme un objet, pour rendre les valeurs de retour plus compréhensibles.

- **Utilisation du type 'Any'** :
  Utilisation du type 'any' induit une perte des avantages du typage et une propagation des erreurs. Ajouter des interfaces précises.

- **Supprimer les commentaires** :
  Si le code est clair, concis et à des bonnes pratiques de règles de nommage, pour les fonctions et variables, alors les commentaires ne seront pas nécessaire.
