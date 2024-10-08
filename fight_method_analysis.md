1) Analyse de la méthode 
    - La méthode fight() ne respecte pas le principe de la responsabilité unique, il gère plusieurs choses à la fois.
        Créer des fonctions pour chaque tâches 
    - Les commentaires ne sont pas utiles et n'apporte rien à la fonction.
    - Il y'a la duplication du calcul des dégats du joueur et de l'ennemi ce qui viole la règle du DRY. Ecrire une fonction qui gère les switchs cases
    - L'ajout d'une nouvelle arme nécessiterait la modification de la fonction ce qui est au contraire au principe de (Fermé à la modificatioin et ouvert à l'extension).
    - La fonction est trop longue et difficile à comprendre en un seul coup et retourne soit un tableau de nombre ou un tableau mixte
