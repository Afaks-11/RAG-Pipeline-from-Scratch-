<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="readmeai/assets/logos/purple.svg" width="30%" style="position: relative; top: 0; right: 0;" alt="Project Logo"/>

# <code>❯ REPLACE-ME</code>

<em></em>

<!-- BADGES -->
<!-- local repository, no metadata badges. -->

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=default&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=default&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Redis-FF4438.svg?style=default&logo=Redis&logoColor=white" alt="Redis">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=default&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<br>
<img src="https://img.shields.io/badge/Passport-34E27A.svg?style=default&logo=Passport&logoColor=white" alt="Passport">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=default&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=default&logo=TypeScript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=default&logo=Zod&logoColor=white" alt="Zod">
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=default&logo=Vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=default&logo=ESLint&logoColor=white" alt="ESLint">

</div>
<br>

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
    - [Project Index](#project-index)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## Overview



---

## Features

|      | Component       | Details                              |
| :--- | :-------------- | :----------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Monolithic architecture with separate backend and frontend packages</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>Uses TypeScript for type safety and maintainability</li><li>Enforces code quality through ESLint and Prettier</li></ul> |
| 📄 | **Documentation** | <ul><li>No explicit documentation, but uses JSDoc-style comments in code</li></ul> |
| 🔌 | **Integrations**  | <ul><li>Uses popular libraries for authentication (Passport), authorization (JWT), and email sending (Nodemailer)</li><li>Integrates with BullMQ for job queuing and Redis for caching</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Separate packages for backend and frontend, but no clear modularity within each package</li></ul> |
| 🧪 | **Testing**       | <ul><li>No explicit testing framework or code coverage reports</li></ul> |
| ⚡️  | **Performance**   | <ul><li>Uses Vite for fast development and production builds</li><li>Optimized for performance with caching and rate limiting</li></ul> |
| 🛡️ | **Security**      | <ul><li>Uses Helmet to secure Express app</li><li>Protects against common web vulnerabilities like SQL injection and cross-site scripting (XSS)</li></ul> |
| 📦 | **Dependencies**  | <ul><li>Has a large number of dependencies, including some outdated versions</li></ul> |
| 🚀 | **Scalability**   | <ul><li>Uses containerization (Docker) and orchestration tools (Kubernetes) for scalable deployment</li></ul> |

Note: The analysis is based on the provided context and may not be exhaustive. Additional features or details might be present in the codebase that are not mentioned here.

**Additional Notes**

* The project uses a mix of modern JavaScript frameworks and libraries, including TypeScript, React, and Express.
* It has a large number of dependencies, which might make maintenance and updates challenging.
* There is no explicit documentation or testing framework, which could impact maintainability and reliability.
* The architecture appears to be monolithic, with separate packages for backend and frontend. However, there is no clear modularity within each package.

---

## Project Structure

```sh
└── /
    ├── backend
    │   ├── .env
    │   ├── .env.example
    │   ├── command.txt
    │   ├── dist
    │   ├── drizzle.config.ts
    │   ├── node_modules
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── src
    │   └── tsconfig.json
    ├── frontend
    │   ├── .gitignore
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── node_modules
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── README.md
    │   ├── src
    │   ├── tsconfig.app.json
    │   ├── tsconfig.json
    │   ├── tsconfig.node.json
    │   └── vite.config.ts
    ├── node_modules
    │   ├── .bin
    │   ├── .package-lock.json
    │   ├── ansi-regex
    │   ├── ansi-styles
    │   ├── chalk
    │   ├── cliui
    │   ├── color-convert
    │   ├── color-name
    │   ├── concurrently
    │   ├── emoji-regex
    │   ├── escalade
    │   ├── get-caller-file
    │   ├── has-flag
    │   ├── is-fullwidth-code-point
    │   ├── rag-material-implementation
    │   ├── require-directory
    │   ├── rxjs
    │   ├── shell-quote
    │   ├── string-width
    │   ├── strip-ansi
    │   ├── supports-color
    │   ├── tree-kill
    │   ├── tslib
    │   ├── wrap-ansi
    │   ├── y18n
    │   ├── yargs
    │   └── yargs-parser
    ├── package-lock.json
    ├── package.json
    └── README.md
```

### Project Index

<details open>
	<summary><b><code>/</code></b></summary>
	<!-- __root__ Submodule -->
	<details>
		<summary><b>__root__</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ __root__</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>- Project Dependency Manager**This code file, <code>package-lock.json</code>, serves as the central dependency manager for the entire project<br>- Its primary purpose is to maintain a record of all dependencies required by the project, ensuring consistency and reproducibility across different environments.By referencing this file, developers can easily identify the versions of each dependency used in the project, making it easier to manage updates, resolve conflicts, and ensure smooth collaboration among team members.The <code>package-lock.json</code> file is a critical component of the projects architecture, enabling efficient dependency management and facilitating the development process.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Configures the monorepo project structure, defining dependencies and scripts for development and build processes across frontend and backend workspaces<br>- Manages package installation, concurrent development environments, and automated builds<br>- Provides a centralized hub for managing dependencies and workflows within the RAG-Pipeline-from-Scratch project.</td>
				</tr>
			</table>
		</blockquote>
	</details>
	<!-- backend Submodule -->
	<details>
		<summary><b>backend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ backend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/.env.example'>.env.example</a></b></td>
					<td style='padding: 8px;'>- Configures environment variables for the backend application, including API keys, JWT secret, Google client credentials, and database connection details<br>- Provides a template for setting up local development environments with specific port numbers and URLs for Redis, PostgreSQL, and frontend communication<br>- Essential for initializing the projects infrastructure and enabling subsequent setup processes.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/command.txt'>command.txt</a></b></td>
					<td style='padding: 8px;'>- Enabling Project Setup and Initialization------------------------------------------This script automates the setup of a Postgres database with Drizzle, seeding it with data, and generating a README file using AI-powered documentation tools<br>- It executes a series of commands to initialize the projects infrastructure, including setting up pgvector, building tables, and populating the database with sample data.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/drizzle.config.ts'>drizzle.config.ts</a></b></td>
					<td style='padding: 8px;'>Configures Drizzle database migrations and schema definitions for the project.Defines database settings, including dialect, credentials, and migration output paths, to facilitate seamless database interactions throughout the application.This configuration enables automated migration management and ensures consistency across the development environment.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>- Project Summary<strong>This code file, <code>package-lock.json</code>, is a critical component of the project's backend architecture<br>- Its primary purpose is to manage dependencies and ensure consistent package versions across the entire project.In essence, this file acts as a snapshot of the project's dependency tree, listing all installed packages and their respective versions<br>- This information enables efficient tracking and resolution of potential conflicts or issues related to package updates.By referencing this file, developers can quickly identify the exact versions of dependencies used in the project, facilitating collaboration, reproducibility, and maintenance efforts.</strong>Key Benefits<em>*</em> Ensures consistent package versions across the project<em> Facilitates dependency management and conflict resolution</em> Supports efficient tracking and updating of packagesThis <code>package-lock.json</code> file is an essential part of the projects infrastructure, providing a clear understanding of its dependencies and enabling smoother development, testing, and deployment processes.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Configures and manages dependencies for the Rag Material Implementation project, including development tools and libraries such as TypeScript, Express, and Passport<br>- Defines scripts for testing, starting the application, seeding data, and running in development mode<br>- Establishes a foundation for building and deploying the projects backend functionality.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/backend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>Configures TypeScript compiler settings for the project, defining file layout, environment, and output options to ensure efficient compilation and type checking of source code in the <code>src</code> directory, with compiled outputs stored in the <code>dist</code> directory.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ backend.src</b></code>
					<!-- api Submodule -->
					<details>
						<summary><b>api</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.api</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/api/server.ts'>server.ts</a></b></td>
									<td style='padding: 8px;'>- Configures and initializes the server, enabling features such as authentication, rate limiting, and error handling<br>- It sets up routes for various APIs, including authentication, document management, and chat functionality, while also exposing a health check endpoint<br>- The server is then started on a specified port, making it accessible to clients.</td>
								</tr>
							</table>
							<!-- controller Submodule -->
							<details>
								<summary><b>controller</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.api.controller</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/controller/auth.controller.ts'>auth.controller.ts</a></b></td>
											<td style='padding: 8px;'>Handles user authentication by providing register and login functionality through API endpoints.Responsible for validating user input, interacting with the AuthService to perform registration and login operations, and returning relevant responses to clients.Part of a larger architecture that enables secure user management within the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/controller/chat.controller.ts'>chat.controller.ts</a></b></td>
											<td style='padding: 8px;'>- Handles chat functionality, enabling users to send messages and retrieve conversation history.This module provides a controller for managing chat interactions, including sending queries and retrieving historical conversations<br>- It integrates with the database and a separate pipeline for processing AI-driven responses<br>- The code ensures secure access control and error handling for robust chat functionality.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/controller/document.controller.ts'>document.controller.ts</a></b></td>
											<td style='padding: 8px;'>- Document Management Controller=============================Handles document upload, listing, and deletion functionality for users.This module provides a centralized interface for managing documents, ensuring secure and efficient storage and retrieval of user-submitted files<br>- It integrates with the database to store and update document metadata, as well as interacts with a message queue to trigger processing tasks.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/controller/oauth.controller.ts'>oauth.controller.ts</a></b></td>
											<td style='padding: 8px;'>- Handles Google OAuth callback, authenticating users and issuing JWT tokens upon successful authentication<br>- Redirects to frontend with token for secure access<br>- Integrates with projects frontend URL configuration and authentication flow<br>- Essential component of the projects authorization mechanism.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/controller/password.controller.ts'>password.controller.ts</a></b></td>
											<td style='padding: 8px;'>- Handles password-related API requests, enabling users to request OTPs and reset passwords securely.This module is a crucial part of the projects authentication mechanism, providing endpoints for password management<br>- It interacts with the PasswordService to generate OTPs and reset passwords, ensuring secure and efficient user account management.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- middleware Submodule -->
							<details>
								<summary><b>middleware</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.api.middleware</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/middleware/auth.middleware.ts'>auth.middleware.ts</a></b></td>
											<td style='padding: 8px;'>- Validates user authentication by checking the presence of a valid JWT token in incoming requests.Ensures that each request includes a properly formatted Bearer token with a valid signature, verifying its contents against project configuration settings<br>- If authentication is successful, it populates the request object with the decoded user data and proceeds to the next middleware function.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/middleware/validate.middleware.ts'>validate.middleware.ts</a></b></td>
											<td style='padding: 8px;'>- Validates incoming requests against predefined schemas, ensuring data consistency and integrity throughout the application.This middleware function is a crucial component of the projects API architecture, enabling robust validation and sanitization of user input<br>- By leveraging Zod schema definitions, it provides a flexible and maintainable way to enforce data constraints across various request parameters.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- routes Submodule -->
							<details>
								<summary><b>routes</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.api.routes</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/routes/auth.routes.ts'>auth.routes.ts</a></b></td>
											<td style='padding: 8px;'>- Handles authentication routes for the application, enabling users to register, login, reset passwords, and authenticate via Google OAuth<br>- It integrates with Passport.js for secure authentication and validation middleware for schema-based input validation<br>- The router exposes endpoints for standard login/register functionality as well as social media authentication through Google OAuth.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/routes/chat.routes.ts'>chat.routes.ts</a></b></td>
											<td style='padding: 8px;'>Handles incoming chat requests and retrieves conversation history through RESTful API endpoints.Provides authentication via JWT to ensure authorized access to chat functionality.Integrates with ChatController to manage business logic, enabling seamless communication between users.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/routes/documents.routes.ts'>documents.routes.ts</a></b></td>
											<td style='padding: 8px;'>Handles document upload, listing, and deletion functionality through RESTful API endpoints.Provides authentication via JWT to ensure authorized access to documents.Configures Multer to restrict file uploads to PDF format with a maximum size limit of 10MB.Integrates with DocumentController to perform business logic for uploading, listing, and deleting documents.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- services Submodule -->
							<details>
								<summary><b>services</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.api.services</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/services/auth.service.ts'>auth.service.ts</a></b></td>
											<td style='padding: 8px;'>- RegisterUser<code> and </code>loginUser<code><br>- The </code>registerUser<code> function creates a new user with hashed password and saves it to the database, while the </code>loginUser` function verifies credentials and generates a JWT token upon successful login<br>- These functions ensure secure user registration and login processes within the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/services/oauth.service.ts'>oauth.service.ts</a></b></td>
											<td style='padding: 8px;'>- Ensures user authentication through Google OAuth by finding or creating a corresponding user account based on the provided profile information.The service checks if an existing user with the same email exists, and if so, updates their credentials to include the Google ID<br>- If not, it creates a new user account with the provided details.This functionality is part of the larger projects authentication mechanism, enabling seamless integration with external services.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/services/password.service.ts'>password.service.ts</a></b></td>
											<td style='padding: 8px;'>Handles user password management through OTP verification.Generates one-time passwords (OTPs) for users and stores them securely in Redis.Verifies OTPs to reset user passwords, updating the stored hash with bcrypt encryption.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/services/voyage.service.ts'>voyage.service.ts</a></b></td>
											<td style='padding: 8px;'>- Handles API requests to the Voyage AI platform, providing functionality for embedding text inputs and reranking documents based on relevance scores<br>- The module fetches embeddings from the Voyage Embedding API and rerank results from the Voyage Rerank API, utilizing a timeout mechanism to prevent prolonged request durations.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- validations Submodule -->
							<details>
								<summary><b>validations</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.api.validations</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/api/validations/auth.schema.ts'>auth.schema.ts</a></b></td>
											<td style='padding: 8px;'>- Validates user authentication data by defining schemas for email, password, and OTP formats to ensure consistency and security across registration, login, forgot password, and reset password endpoints<br>- These schemas enforce strict formatting rules, error messages, and minimum length requirements for passwords and OTPs.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- chat Submodule -->
					<details>
						<summary><b>chat</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.chat</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/chat/chat-pipeline.ts'>chat-pipeline.ts</a></b></td>
									<td style='padding: 8px;'>- The <code>runChatPipeline</code> function orchestrates the chat pipeline, processing user queries through a series of steps including caching, routing, search, and Large Language Model (LLM) generation<br>- It handles query rewriting, database interactions, and AI-driven response creation, ultimately returning a payload with the final answer and relevant document sources.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- chunk Submodule -->
					<details>
						<summary><b>chunk</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.chunk</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/chunk/chunker.ts'>chunker.ts</a></b></td>
									<td style='padding: 8px;'>- Text is chunked into manageable sections based on customizable parameters such as maximum size, overlap, and separators<br>- The resulting chunks are then filtered to remove empty strings, ensuring only relevant content is returned<br>- This functionality is a core component of the projects text processing capabilities.</td>
								</tr>
							</table>
							<!-- interface Submodule -->
							<details>
								<summary><b>interface</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.chunk.interface</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/chunk/interface/chunk.interface.ts'>chunk.interface.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the Chunk interface, specifying its properties and metadata structure<br>- The interface is used to represent a chunk of content with associated text, index, and optional metadata<br>- It serves as a blueprint for data exchange between components in the application, ensuring consistency and clarity throughout the systems architecture.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- config Submodule -->
					<details>
						<summary><b>config</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.config</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/config/config.ts'>config.ts</a></b></td>
									<td style='padding: 8px;'>- Configures environment variables for the application, ensuring required keys are present and accessible throughout the system<br>- It defines a centralized configuration object, <code>CONFIG</code>, which exposes sensitive API keys, database connections, and other essential settings to the rest of the codebase<br>- This file enables seamless integration with external services and facilitates development and deployment processes.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/config/groq-client.ts'>groq-client.ts</a></b></td>
									<td style='padding: 8px;'>Configures Groq client instance with provided API key from project configuration.Establishes connection to Groq database, enabling data retrieval and manipulation within the application.Key component of backend architecture, facilitating seamless interaction between application code and Groq database.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/config/passport.ts'>passport.ts</a></b></td>
									<td style='padding: 8px;'>- Configures Passport.js authentication strategies for the application, enabling Google OAuth and JWT-based authentication<br>- It sets up a Google strategy to authenticate users via their Google accounts and a JWT strategy to validate JSON Web Tokens issued by the application<br>- The configuration allows for secure user authentication and authorization across different routes.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/config/queue.ts'>queue.ts</a></b></td>
									<td style='padding: 8px;'>- Configures and initializes the Redis connection for BullMQ queue management, enabling efficient job processing and retries with exponential backoff strategy<br>- The pdfQueue is created to handle PDF ingestion tasks, utilizing a robust retry mechanism to ensure reliable task execution<br>- This setup is crucial for maintaining system reliability and fault tolerance in the projects backend architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/config/redis.ts'>redis.ts</a></b></td>
									<td style='padding: 8px;'>- Establishes Redis connection for caching purposes within the projects architecture.Configures a Redis client with the provided URL from the projects configuration and sets up error handling<br>- The <code>connectRedis</code> function attempts to establish a connection, logging success or warning messages accordingly<br>- This enables cache functionality throughout the application.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- database Submodule -->
					<details>
						<summary><b>database</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.database</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/database/index.ts'>index.ts</a></b></td>
									<td style='padding: 8px;'>Establishes database connection and initializes Drizzle ORM instance with schema definitions.Provides a centralized data access layer, enabling interaction with the PostgreSQL database via the <code>drizzle</code> library.Configured using environment variables from the <code>CONFIG</code> module.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/database/queries.ts'>queries.ts</a></b></td>
									<td style='padding: 8px;'>- Updates document metadata and vectorized chunks in the database with versioning.This function inserts new chunk data while deleting existing chunks associated with a specific document ID, ensuring data consistency and integrity across updates<br>- It also logs successful update operations<br>- The function is designed to handle concurrent transactions and maintain database consistency.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/database/setup.ts'>setup.ts</a></b></td>
									<td style='padding: 8px;'>Establishes database connection and enables pgVector extensionConfigures Postgres pool using environment variable DATABASE_URLEnsures pgVector extension is installed to enable vector-based operationsCatches errors during setup, exiting process if installation failsFinalizes database connection by ending the pool after setup completion.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/database/vector-store.ts'>vector-store.ts</a></b></td>
									<td style='padding: 8px;'>- Search functionality is implemented in this file, which performs a hybrid search combining vector similarity with full-text BM25 matching<br>- It fetches the top 20 results from PostgreSQL and then reranks them using Voyage AIs Reranker API to return the final top 3 chunks<br>- The function returns a RetrievalResponse object containing the status and chunks.</td>
								</tr>
							</table>
							<!-- interface Submodule -->
							<details>
								<summary><b>interface</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.database.interface</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/interface/retrievalResponse.interface.ts'>retrievalResponse.interface.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the structure of retrieval responses from the database, encapsulating the status and associated search results<br>- It serves as a blueprint for data retrieved by the system, providing a standardized format for handling various outcomes<br>- This interface is crucial in maintaining consistency across different scenarios, ensuring seamless integration with other components of the project.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/interface/searchResult.interface.ts'>searchResult.interface.ts</a></b></td>
											<td style='padding: 8px;'>Defines the structure of search results data, providing a standardized interface for accessing relevant information from database queries.The SearchResult interface encapsulates key metadata, including document identifiers, content summaries, and similarity metrics, facilitating efficient data retrieval and processing throughout the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/interface/storeDocument.interface.ts'>storeDocument.interface.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the interface for storing documents in the database, specifying the required properties and their types<br>- The StoredDocument interface encapsulates metadata associated with a document, including its chunk, embedding, and source information<br>- This interface is crucial for interacting with the database layer, ensuring consistency and structure in data storage.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- schema Submodule -->
							<details>
								<summary><b>schema</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.database.schema</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/schema/chatHistory.ts'>chatHistory.ts</a></b></td>
											<td style='padding: 8px;'>- Defines database schema for chat history records, establishing relationships with users and documents tables<br>- It creates a unique identifier for each record, links it to the user who initiated the conversation, and stores the document ID involved<br>- The role of the user is also specified, along with the content exchanged during the conversation.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/schema/chunks.ts'>chunks.ts</a></b></td>
											<td style='padding: 8px;'>- Defines database schema for chunks entity, establishing relationships with users and documents tables through foreign keys<br>- Indexes are created on userId, documentId, and embedding fields to optimize query performance<br>- The schema includes a primary key and not-null constraints on all columns, ensuring data integrity<br>- This definition is part of the larger project structure, contributing to the overall database architecture.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/schema/documents.ts'>documents.ts</a></b></td>
											<td style='padding: 8px;'>- Defines database schema for documents entity within the projects data model, establishing relationships with users table through foreign key constraints and default values for document metadata and timestamps<br>- This schema is a crucial component of the backend infrastructure, enabling efficient storage and retrieval of document-related data.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/schema/index.ts'>index.ts</a></b></td>
											<td style='padding: 8px;'>- Exports database schema definitions from individual files, providing a centralized interface for accessing various data models within the application<br>- The schema is comprised of users, documents, chunks, and chat history entities, facilitating data management and interaction across the system.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/database/schema/users.ts'>users.ts</a></b></td>
											<td style='padding: 8px;'>- Defines database schema for user management, including unique identifiers, authentication details, and timestamps for tracking updates and creations.This file outlines the structure of user data stored in the database, ensuring consistency and integrity across all interactions<br>- It is a critical component of the projects backend architecture, enabling efficient and secure user management.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- embedding Submodule -->
					<details>
						<summary><b>embedding</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.embedding</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/embedding/embedding.ts'>embedding.ts</a></b></td>
									<td style='padding: 8px;'>- EmbedQuery<code> and </code>embedBatch`, which process individual queries and batches of documents respectively, returning numerical embeddings as output<br>- The implementation ensures efficient processing while adhering to the specified API usage guidelines.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- generator Submodule -->
					<details>
						<summary><b>generator</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.generator</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/generator/generator.ts'>generator.ts</a></b></td>
									<td style='padding: 8px;'>- Generates a completion response based on provided context documents and user query.This function orchestrates the interaction with a large language model to produce an answer, utilizing the context documents as input and adhering to specific rules<br>- The generated response is then returned along with the original context sources and prompt used for generation.</td>
								</tr>
							</table>
							<!-- interface Submodule -->
							<details>
								<summary><b>interface</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.generator.interface</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/generator/interface/generationResult.interface.ts'>generationResult.interface.ts</a></b></td>
											<td style='padding: 8px;'>- Defines the GenerationResult interface, specifying the structure of data returned from a generation process<br>- It includes an answer, sources related to the answer, and the original prompt used for generation<br>- This interface is part of the backends generation logic, providing a standardized format for results across different use cases.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- ingestion Submodule -->
					<details>
						<summary><b>ingestion</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.ingestion</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/ingestion/ingestion.ts'>ingestion.ts</a></b></td>
									<td style='padding: 8px;'>- Ingests PDF documents into the system by extracting raw text, metadata, and embeddings from the file, then stores them securely in a vector database with versioning enabled<br>- This process involves loading the file, parsing its contents, chunking the text, fetching embeddings, and inserting the data into the database.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- llm-routing Submodule -->
					<details>
						<summary><b>llm-routing</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.llm-routing</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/llm-routing/query-rewriter.ts'>query-rewriter.ts</a></b></td>
									<td style='padding: 8px;'>- Rewrites user queries into standalone questions by analyzing their recent chat history with a Large Language Model (LLM)<br>- It fetches the relevant chat history, formats it into a prompt, and uses the LLM to generate a rewritten query<br>- If the LLM is overloaded, it falls back to the original query<br>- This functionality is part of a larger architecture that integrates with a database and a Groq client.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/llm-routing/query-router.ts'>query-router.ts</a></b></td>
									<td style='padding: 8px;'>Determines query routing decisions for the RAG system.Handles user queries by analyzing their intent and deciding whether to route them to a document database or bypass it for casual greetings.Returns a RouteDecision object with an action" property indicating whether the query requires searching (SEARCH) or is a greeting (GREETING).</td>
								</tr>
							</table>
							<!-- interface Submodule -->
							<details>
								<summary><b>interface</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ backend.src.llm-routing.interface</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/backend/src/llm-routing/interface/routeDecision.interface.ts'>routeDecision.interface.ts</a></b></td>
											<td style='padding: 8px;'>Defines routing decisions for the application, specifying possible actions and direct responses.The RouteDecision interface outlines the structure of decision-making processes within the system, enabling it to navigate different scenarios such as greetings or searches.This interface is a crucial component in determining the flow of interactions between users and the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<!-- scripts Submodule -->
					<details>
						<summary><b>scripts</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.scripts</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/scripts/seed.ts'>seed.ts</a></b></td>
									<td style='padding: 8px;'>- Seeds the database with a test user and document record, enabling ingestion of a PDF file into Postgres.This process creates a new user account, inserts a corresponding document record, and initiates the ingestion pipeline for a specified PDF file<br>- The seeded data facilitates testing and development of the applications vector search functionality.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/scripts/test-pipeline.ts'>test-pipeline.ts</a></b></td>
									<td style='padding: 8px;'>- Automates end-to-end testing of the chat pipeline by simulating user interactions with the system, verifying AI responses, and checking Redis cache behavior<br>- The script connects to the database, selects test users and documents, runs four test cases, and logs results<br>- It also ensures proper cleanup after each test run.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- worker Submodule -->
					<details>
						<summary><b>worker</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ backend.src.worker</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/backend/src/worker/pdf-worker.ts'>pdf-worker.ts</a></b></td>
									<td style='padding: 8px;'>- Manages PDF ingestion workflow by processing jobs from the pdf-ingestion-queue queue, updating document status in the database, and deleting processed files<br>- It handles job retries with a maximum of three attempts within a 61-second window, ensuring efficient and reliable processing of large volumes of documents.</td>
								</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<!-- frontend Submodule -->
	<details>
		<summary><b>frontend</b></summary>
		<blockquote>
			<div class='directory-path' style='padding: 8px 0; color: #666;'>
				<code><b>⦿ frontend</b></code>
			<table style='width: 100%; border-collapse: collapse;'>
			<thead>
				<tr style='background-color: #f8f9fa;'>
					<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
					<th style='text-align: left; padding: 8px;'>Summary</th>
				</tr>
			</thead>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/eslint.config.js'>eslint.config.js</a></b></td>
					<td style='padding: 8px;'>Configures ESLint rules and settings for the frontend project, extending recommended configurations from various plugins to ensure consistent coding standards across JavaScript, TypeScript, React Hooks, and React Refresh codebases.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/index.html'>index.html</a></b></td>
					<td style='padding: 8px;'>- Defines the entry point of the frontend application, responsible for rendering the user interface and loading the main application logic from /src/main.tsx<br>- It sets up basic metadata, links to the favicon, and establishes the viewport settings<br>- The file serves as a starting point for the React-based UI, bootstrapping the entire application architecture.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/package-lock.json'>package-lock.json</a></b></td>
					<td style='padding: 8px;'>- Rag-ui<strong>**File:</strong> <code>frontend\package-lock.json</code><strong>Summary:</strong>This file is a dependency lockfile that ensures the project's dependencies are consistent across environments<br>- It provides a snapshot of the exact versions of packages required by the project, including frontend libraries and tools such as Tailwind CSS, Lucide React, and ESLint.<strong>Purpose:</strong>The <code>package-lock.json</code> file enables reproducible builds and prevents dependency version conflicts by locking down the versions of all dependencies used in the project<br>- This ensures that the project can be easily set up and run on different machines with the same dependencies.<strong>Impact on Architecture:</strong>This file is a critical component of the projects build process, ensuring that the frontend codebase is properly configured and consistent across environments<br>- It plays a key role in maintaining the stability and reliability of the project by managing dependencies and preventing version conflicts.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/package.json'>package.json</a></b></td>
					<td style='padding: 8px;'>- Configures the frontend package for the Rag UI project, managing dependencies and scripts for development, build, linting, and preview tasks<br>- It sets up a Vite environment with Tailwind CSS and React, utilizing TypeScript for type checking and ESLint for code validation<br>- This file enables efficient development and deployment of the Rag UI application.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/tsconfig.app.json'>tsconfig.app.json</a></b></td>
					<td style='padding: 8px;'>- Configures TypeScript settings for the frontend application, enabling bundler mode with es2023 target and DOM support, while skipping lib checks and disabling emit to optimize build process<br>- Includes source files from the src directory and enables linting features such as unused locals and parameters detection.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/tsconfig.json'>tsconfig.json</a></b></td>
					<td style='padding: 8px;'>Configures TypeScript settings for the project by referencing external configuration files.The file enables project-wide TypeScript configuration through references to tsconfig.app.json and tsconfig.node.json, allowing for tailored configurations based on application and node-specific requirements.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/tsconfig.node.json'>tsconfig.node.json</a></b></td>
					<td style='padding: 8px;'>- Configures TypeScript compiler settings for the frontend module, enabling bundler mode with es2023 target and specific linting rules to ensure efficient and error-free code generation<br>- Integrates with Vite configuration file, allowing for streamlined development and build processes.</td>
				</tr>
				<tr style='border-bottom: 1px solid #eee;'>
					<td style='padding: 8px;'><b><a href='/frontend/vite.config.ts'>vite.config.ts</a></b></td>
					<td style='padding: 8px;'>- Configures the Vite development environment for building React applications with Tailwind CSS support.This file enables the use of React and Tailwind CSS plugins, allowing developers to leverage their respective features in the project<br>- It plays a crucial role in setting up the frontend build process, ensuring seamless integration with other components in the codebase.</td>
				</tr>
			</table>
			<!-- src Submodule -->
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<div class='directory-path' style='padding: 8px 0; color: #666;'>
						<code><b>⦿ frontend.src</b></code>
					<table style='width: 100%; border-collapse: collapse;'>
					<thead>
						<tr style='background-color: #f8f9fa;'>
							<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
							<th style='text-align: left; padding: 8px;'>Summary</th>
						</tr>
					</thead>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='/frontend/src/App.tsx'>App.tsx</a></b></td>
							<td style='padding: 8px;'>Authenticates user sessions and manages application layout.Handles token verification on initial load, checking for expiration and clearing session if necessary.Provides a logout functionality to remove stored tokens and reset application state.Displays the login/register screen when no token is present, otherwise renders the main application with sidebar and main stage components.</td>
						</tr>
						<tr style='border-bottom: 1px solid #eee;'>
							<td style='padding: 8px;'><b><a href='/frontend/src/main.tsx'>main.tsx</a></b></td>
							<td style='padding: 8px;'>- Initializes the React application by rendering the App component within a StrictMode wrapper to the DOM element with the id root<br>- This file serves as the entry point for the frontend, bootstrapping the entire application and setting up the rendering environment<br>- It is essential for launching the application successfully.</td>
						</tr>
					</table>
					<!-- hooks Submodule -->
					<details>
						<summary><b>hooks</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.hooks</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/hooks/useChat.ts'>useChat.ts</a></b></td>
									<td style='padding: 8px;'>- Enables real-time chat functionality within the application by providing a hook that manages chat messages, typing status, and error handling<br>- It facilitates loading chat history, sending user queries, and clearing the chat interface<br>- The hook returns an object with properties to access and manipulate chat state, allowing components to seamlessly integrate chat capabilities into their functionality.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/hooks/useDocs.ts'>useDocs.ts</a></b></td>
									<td style='padding: 8px;'>- Documents are fetched and managed through the useDocs hook, which provides a centralized mechanism for handling document loading, uploading, and refetching<br>- It enables smart polling for processing documents and returns essential state and functions for seamless integration with the applications UI and logic.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- services Submodule -->
					<details>
						<summary><b>services</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.services</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/services/apiClient.ts'>apiClient.ts</a></b></td>
									<td style='padding: 8px;'>Handles API requests by fetching data from the server with optional authentication using a stored token.Provides a unified interface for making HTTP requests to the backend API, abstracting away implementation details and ensuring consistent error handling.Integrates with the projects environment variables for API URL configuration.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/services/authAPI.ts'>authAPI.ts</a></b></td>
									<td style='padding: 8px;'>- Handles authentication API requests, providing methods for user login and registration through a secure POST request to the servers auth endpoint, returning a token and user data upon successful authentication<br>- The implementation is part of the larger project structure, which includes frontend and backend components.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/services/chatAPI.ts'>chatAPI.ts</a></b></td>
									<td style='padding: 8px;'>SendMessage<code> and </code>getHistory`, which enable seamless integration of chat capabilities within the projects architecture.</td>
								</tr>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/services/documentAPI.ts'>documentAPI.ts</a></b></td>
									<td style='padding: 8px;'>- Provides API services for document management, enabling listing, uploading, and deleting documents through a unified interface.This module encapsulates the logic for interacting with the document API, abstracting away implementation details to simplify usage<br>- It is designed to be used in conjunction with other components within the projects architecture.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- types Submodule -->
					<details>
						<summary><b>types</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.types</b></code>
							<table style='width: 100%; border-collapse: collapse;'>
							<thead>
								<tr style='background-color: #f8f9fa;'>
									<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
									<th style='text-align: left; padding: 8px;'>Summary</th>
								</tr>
							</thead>
								<tr style='border-bottom: 1px solid #eee;'>
									<td style='padding: 8px;'><b><a href='/frontend/src/types/index.ts'>index.ts</a></b></td>
									<td style='padding: 8px;'>- Defines document and chat message interfaces that structure data exchanged between components, enabling seamless communication and synchronization within the application.These interfaces provide a common language for different parts of the system to understand and process data, ensuring consistency and accuracy throughout the workflow<br>- They play a crucial role in maintaining data integrity and facilitating efficient interactions between various components.</td>
								</tr>
							</table>
						</blockquote>
					</details>
					<!-- components Submodule -->
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<div class='directory-path' style='padding: 8px 0; color: #666;'>
								<code><b>⦿ frontend.src.components</b></code>
							<!-- chat Submodule -->
							<details>
								<summary><b>chat</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.chat</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/chat/ChatBubble.tsx'>ChatBubble.tsx</a></b></td>
											<td style='padding: 8px;'>- Displays user and AI chat messages in a visually distinct format, with AI messages including citations from referenced sources<br>- The component takes a ChatMessage object as input and renders the message content along with optional citations if applicable<br>- It adapts its layout based on whether the message is from a user or an AI model.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/chat/ChatInput.tsx'>ChatInput.tsx</a></b></td>
											<td style='padding: 8px;'>- Handles user input for sending messages in the chat interface, enabling users to submit questions about their documents<br>- It provides a form with an input field and a send button, allowing users to clear input after sending and displaying a loading indicator when submitting<br>- The component is designed to be reusable and customizable through props.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/chat/CitationChip.tsx'>CitationChip.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides citation information in a reusable UI component.The CitationChip component displays a citation string within a customizable button, allowing users to interact with the citation through an optional onClick event handler<br>- It is designed to be easily integrated into various chat interfaces throughout the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- documents Submodule -->
							<details>
								<summary><b>documents</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.documents</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/documents/DocumentCard.tsx'>DocumentCard.tsx</a></b></td>
											<td style='padding: 8px;'>- DocumentCard component renders a visual representation of a document, displaying its name, version, and status<br>- It provides an interactive experience by allowing users to click on the card, triggering potential actions based on the provided onClick function<br>- The components appearance changes dynamically depending on the documents status, offering a clear indication of its processing or completion state.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/documents/DocumentList.tsx'>DocumentList.tsx</a></b></td>
											<td style='padding: 8px;'>- Displays a list of documents, allowing users to select one document at a time<br>- It renders a message when no documents are available and displays each document as a card with an optional selection indicator<br>- The component is designed to be used within the applications document management system, providing a user-friendly interface for navigating and selecting documents.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- layout Submodule -->
							<details>
								<summary><b>layout</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.layout</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/layout/AuthScreen.tsx'>AuthScreen.tsx</a></b></td>
											<td style='padding: 8px;'>- Handles user authentication by providing a login and registration form<br>- The component determines whether to display the login or registration form based on its state and allows users to switch between the two modes<br>- It also handles form submission, making API calls to authenticate users and storing tokens in local storage upon successful login.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/layout/MainStage.tsx'>MainStage.tsx</a></b></td>
											<td style='padding: 8px;'>- The MainStage component serves as the central hub for user interaction within the application, facilitating real-time chat functionality between users and AI-powered knowledge base<br>- It manages message display, typing indicators, and auto-scrolling to ensure seamless communication experience<br>- The component also handles document selection and loading of conversation history.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/layout/Sidebar.tsx'>Sidebar.tsx</a></b></td>
											<td style='padding: 8px;'>- Provides user interface for document management**This component renders a sidebar that allows users to upload PDF documents and view their existing documents<br>- It includes features such as file input, upload button, and document list display<br>- The component is designed to be reusable and can be integrated into the projects main layout.</td>
										</tr>
									</table>
								</blockquote>
							</details>
							<!-- ui Submodule -->
							<details>
								<summary><b>ui</b></summary>
								<blockquote>
									<div class='directory-path' style='padding: 8px 0; color: #666;'>
										<code><b>⦿ frontend.src.components.ui</b></code>
									<table style='width: 100%; border-collapse: collapse;'>
									<thead>
										<tr style='background-color: #f8f9fa;'>
											<th style='width: 30%; text-align: left; padding: 8px;'>File Name</th>
											<th style='text-align: left; padding: 8px;'>Summary</th>
										</tr>
									</thead>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/ui/Button.tsx'>Button.tsx</a></b></td>
											<td style='padding: 8px;'>- Defines customizable buttons with loading indicators for the frontend application, allowing users to interact with various UI elements while providing visual feedback during asynchronous operations<br>- The component supports different button variants and can be disabled or customized with additional classes<br>- It is designed to enhance user experience by providing a consistent and visually appealing interface throughout the application.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/ui/Input.tsx'>Input.tsx</a></b></td>
											<td style='padding: 8px;'>- Defines UI input component functionality, providing customizable input fields with default styles and behaviors<br>- It extends Reacts InputHTMLAttributes to accommodate various props and allows users to pass custom class names through the className prop<br>- The component is designed to be reusable across the application, adhering to a consistent design language.</td>
										</tr>
										<tr style='border-bottom: 1px solid #eee;'>
											<td style='padding: 8px;'><b><a href='/frontend/src/components/ui/Spinner.tsx'>Spinner.tsx</a></b></td>
											<td style='padding: 8px;'>Enables customizable loading animations within the applications UI.Provides a reusable Spinner component that can be easily integrated into various parts of the frontend, offering adjustable size and styling options to match different design requirements.Supports seamless integration with other components, ensuring a consistent user experience throughout the application.</td>
										</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** TypeScript
- **Package Manager:** Npm

### Installation

Build  from the source and intsall dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone ../
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd 
    ```

3. **Install the dependencies:**

<!-- SHIELDS BADGE CURRENTLY DISABLED -->
	<!-- [![npm][npm-shield]][npm-link] -->
	<!-- REFERENCE LINKS -->
	<!-- [npm-shield]: https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white -->
	<!-- [npm-link]: https://www.npmjs.com/ -->

	**Using [npm](https://www.npmjs.com/):**

	```sh
	❯ npm install
	```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm start
```

### Testing

 uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**
```sh
npm test
```

---

## Roadmap

- [X] **`Task 1`**: <strike>Implement feature one.</strike>
- [ ] **`Task 2`**: Implement feature two.
- [ ] **`Task 3`**: Implement feature three.

---

## Contributing

- **💬 [Join the Discussions](https://LOCAL///discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://LOCAL///issues)**: Submit bugs found or log feature requests for the `` project.
- **💡 [Submit Pull Requests](https://LOCAL///blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your LOCAL account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone .
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to LOCAL**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://LOCAL{///}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=/">
   </a>
</p>
</details>

---

## License

 is protected under the [LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## Acknowledgments

- Credit `contributors`, `inspiration`, `references`, etc.

<div align="right">

[![][back-to-top]](#top)

</div>


[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square


---
