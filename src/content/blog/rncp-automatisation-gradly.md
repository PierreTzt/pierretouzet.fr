---
title: "Automatiser la gestion RNCP : pourquoi j'ai créé Gradly"
description: "Les coordinateurs pédagogiques perdent des jours à produire des bulletins RNCP. J'ai créé un outil pour diviser ce temps par 3. Voici comment."
date: 2026-02-03
lang: fr
tags: ['EdTech', 'RNCP', 'Gradly', 'Automatisation']
---

Si vous travaillez dans l'enseignement supérieur privé, vous connaissez la douleur : les bulletins RNCP.

Des tableaux Excel croisés avec des référentiels de compétences, des blocs, des ECTS, des notes par UE, des moyennes pondérées... Le tout à produire pour des centaines d'étudiants, plusieurs fois par an.

## Le problème

Dans le réseau d'écoles où j'interviens, les coordinateurs pédagogiques passaient **2 à 3 jours par session** à produire ces bulletins. Manuellement. Avec des risques d'erreur à chaque ligne.

Multipliez par 6 campus, 3 sessions par an, et vous obtenez un gouffre de temps qui ne produit aucune valeur pédagogique.

## La solution bricolée

J'ai d'abord tenté l'approche classique : macros Excel, formules imbriquées, templates partagés. Ça marchait... jusqu'à ce que quelqu'un modifie une colonne par erreur et casse tout le fichier.

## L'approche Gradly

J'ai décidé de construire un vrai outil. Pas une usine à gaz — un outil simple qui fait une chose bien :

1. **Import des données** : les notes arrivent depuis le SI existant
2. **Mapping automatique** : les UE sont liées aux blocs RNCP une seule fois, dans un référentiel centralisé
3. **Génération** : un clic, tous les bulletins sont produits au bon format
4. **Vérification** : des contrôles automatiques signalent les incohérences avant publication

## Les résultats

- **Temps de production divisé par 3** : de 2-3 jours à moins d'une journée
- **Erreurs quasi éliminées** : les contrôles automatiques rattrapent ce que l'humain rate
- **Coordinateurs libérés** : ils peuvent enfin consacrer du temps à l'accompagnement pédagogique

## Ce que j'ai appris

### Le meilleur outil est celui qu'on utilise

J'aurais pu construire une plateforme complète avec 50 fonctionnalités. J'ai choisi de faire un outil qui fait 3 choses parfaitement. Résultat : adoption immédiate.

### Le terrain dicte le produit

Chaque fonctionnalité de Gradly vient d'un problème réel observé sur le terrain, au contact des équipes et des [réalités de la conduite du changement](/fr/blog/conduite-changement-ecoles/). Pas d'un brainstorming en salle de réunion.

### L'automatisation n'est pas une fin en soi

L'objectif n'a jamais été "automatiser pour automatiser". C'était : redonner du temps aux coordinateurs pour faire leur vrai métier — accompagner les étudiants et les formateurs. C'est d'ailleurs ce que [mon propre parcours](/fr/blog/parcours-atypique-bac-pro/) m'a appris : la tech n'a de valeur que si elle sert les gens.

C'est la différence entre un projet tech et un projet utile.
