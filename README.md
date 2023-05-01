# Personal Website Repo

## Description

This personal website repo contains the source code for a website that showcases a developer's portfolio using an interactive chatbot assistant powered by OpenAI GPT-3.5-turbo. The website features a background animation using the Game of Life algorithm and a 2D \<canvas \/\> element. It is intended for potential employers to learn more about the developer's skills and projects.

## Technologies

The website is built using the following technologies:

-   [Supabase](https://supabase.com/): A real-time, open-source Firebase alternative
-   [Next.js](https://nextjs.org/) 13: A framework for building React applications
-   [TypeScript](https://www.typescriptlang.org/): A strongly-typed superset of JavaScript
-   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework

## Background Animation

The background animation is implemented using TypeScript and a 2D \<canvas \/\> element. It is based on the Game of Life cellular automaton algorithm, which simulates the evolution of living cells on a grid.

## Chatbot Assistant

The chatbot assistant is powered by OpenAI's GPT-3.5-turbo and acts as an interactive portfolio. It allows users to ask questions and receive answers about the developer's skills, projects, and experiences.

## Supabase Database Schema

The Supabase database schema consists of the following tables:

| Table        | Attributes                                                                                                                         | Description                                                                                                                             |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `documents`  | `id`: integer (PK)<br>`title`: text (Unique)<br>`body`: text<br>`category`: document_category (Enum: personal, professional, misc) | Stores information about various documents, such as the developer's projects or experiences.                                            |
| `embeddings` | `id`: integer (PK)<br>`embedding`: vector<br>`document_id`: integer (FK → `documents.id`)                                          | Stores precomputed document embeddings for efficient similarity calculations.                                                           |
| `context`    | `id`: integer (PK)<br>`title`: text<br>`body`: text                                                                                | Stores pre-defined chatbot messages, such as system and introduction messages to guide users during their interaction with the chatbot. |

In addition to the tables, a custom function called "match_documents" is used to calculate the similarity between document embeddings and user inputs, enabling the chatbot to return the most relevant responses.
