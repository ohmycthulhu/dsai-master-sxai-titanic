# Symbolic and Explainable AI - Final Project 

## Introduction

This is a final project for SXAI. The objective is to train classificator on Titanic dataset and build an ontology to check the classification consistency.
We use SVC for classification and OWL for building ontology with `owlready2` for using it to check the consistency.

## Ontology

The ontology consists of passengers information with essential properties (age, passenger class, sex, and survival status).
It contains 6 rules that covers ~65% of dataset and allows checking the survival state with 91% accuracy.

The consistency of ontology is considered non-questionable and if the classificator's result differs then we consider the result inconsistent.

The OWL file can be found both in `titanic_ontology.owl` and `backend/ontology.owl`.


## Back-end

The back-end is based on https://github.com/FredHutch/flask-python-template.

It's basic Flask program that operates with data from `backend/passengers.json`, uses classificator from `backend/model.joblib`,
and ontology from `backend/model.joblib`.

It extensively uses caching to avoid repeating the expensive operations. 

## Front-end

The front-end is based on https://github.com/xKabbe/react-mui-typescript-template.

The front-end is presented as CSR application that communicates with back-end using Rest API. 
