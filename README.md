<div id="top">

<!-- HEADER STYLE: CLASSIC -->

<div align="center">

# ROSTER-MANAGER-PRO

<em></em>

<br>

---

## Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Project Structure](#project-structure)

  * [Project Index](#project-index)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Testing](#testing)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Acknowledgments](#acknowledgments)

---

## Overview

A scheduling system to manage providers, their availability, and appointments.
Built with **Next.js 15, TypeScript, Redux Toolkit, and Tailwind CSS**.

---

## Features

*  Dynamic provider roster (API-driven)
*  Filters for **Service**, **Type**, and **Center**
*  Search functionality
*  Weekly calendar grid (00:00 – 23:00)
*  Color-coded availability slots:

  * 🟩 Online
  * 🟧 Offline
  * 🟦 Online + Offline
  * 🟫 Blocked
  * ⬜ Available
*  Responsive UI with TailwindCSS

---

[Click here to view the live app]()



## Project Structure

```sh
└── roster-manager-pro/
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── mock
    │   └── svg
    ├── src
    │   ├── app
    │   ├── components
    │   ├── lib
    │   ├── store
    │   └── ui
    └── tsconfig.json
```

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

* **Programming Language:** TypeScript
* **Framework:** Next.js 15
* **Package Manager:** Npm
* **Container Runtime:** Docker

### Installation

1. Clone the repository:

```sh
git clone https://github.com/udayige/RosterManagerPro.git
cd roster-management-app
```

2. Install dependencies:

```sh
npm install
```

3. Run development server:

```sh
npm run dev
```

App will run at [http://localhost:3000](http://localhost:3000)



## Contributing

Contributions are welcome! 🚀

1. Fork the project
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">
Made with ❤️ using Next.js 15, TypeScript, and TailwindCSS
</div>

