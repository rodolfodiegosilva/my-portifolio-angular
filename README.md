
# My Portfolio Angular

Este é um projeto de portfólio desenvolvido em Angular. Ele exibe dados pessoais, perfil, habilidades, e projetos com integração à API do GitHub para obter dados dinâmicos.

## Estrutura do Projeto

```
my-portfolio-angular/
├── .angular/
├── src/
│   ├── app/
│   │   ├── personal-data/
│   │   │   ├── personal-data.component.css
│   │   │   ├── personal-data.component.html
│   │   │   └── personal-data.component.ts
│   │   ├── profile/
│   │   │   ├── profile.component.css
│   │   │   ├── profile.component.html
│   │   │   └── profile.component.ts
│   │   ├── services/
│   │   │   └── github.service.ts
│   │   ├── skills/
│   │   │   ├── skills.component.css
│   │   │   ├── skills.component.html
│   │   │   └── skills.component.ts
│   │   ├── toggle-button/
│   │   │   ├── toggle-button.component.css
│   │   │   ├── toggle-button.component.html
│   │   │   └── toggle-button.component.ts
│   ├── assets/
│   │   ├── i18n/
│   │   │   ├── en.json
│   │   │   └── pt.json
│   │   ├── projects/
│   ├── environments/
│   │   ├── environment.prod.ts
│   │   └── environment.ts
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Configuração e Execução do Projeto

### Pré-requisitos

- Node.js (versão 20 ou superior)
- Angular CLI (versão 17 ou superior)

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/rodolfodiegosilva/my-portifolio-angular.git
cd my-portfolio-angular
```

2. **Instale as dependências**

```bash
npm install
```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```bash
ng serve
```

O aplicativo estará disponível em `http://localhost:4200/`.

### Construção

Para construir o projeto para produção, execute:

```bash
ng build --prod
```

Os arquivos de saída estarão na pasta `dist/`.

### Testes

Para executar os testes unitários via [Karma](https://karma-runner.github.io):

```bash
ng test
```

Para executar os testes end-to-end via [Protractor](http://www.protractortest.org/):

```bash
ng e2e
```

## Documentação dos Componentes

### PersonalDataComponent

**Localização:** `src/app/personal-data/personal-data.component.*`

**Descrição:** Exibe os dados pessoais do usuário.

#### personal-data.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent {
  // Propriedades e métodos do componente
}
```

### ProfileComponent

**Localização:** `src/app/profile/profile.component.*`

**Descrição:** Exibe o perfil do usuário.

#### profile.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  // Propriedades e métodos do componente
}
```

### SkillsComponent

**Localização:** `src/app/skills/skills.component.*`

**Descrição:** Exibe as habilidades do usuário.

#### skills.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  // Propriedades e métodos do componente
}
```

### ToggleButtonComponent

**Localização:** `src/app/toggle-button/toggle-button.component.*`

**Descrição:** Componente de botão de alternância.

#### toggle-button.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.css']
})
export class ToggleButtonComponent {
  // Propriedades e métodos do componente
}
```

## Serviços

### GithubService

**Localização:** `src/app/services/github.service.ts`

**Descrição:** Serviço para integração com a API do GitHub.

#### github.service.ts

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserRepos(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/repos`);
  }
}
```

## Internacionalização

Os arquivos de tradução estão localizados em `src/assets/i18n/`. Atualmente, há suporte para inglês (`en.json`) e português (`pt.json`).

---

