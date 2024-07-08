# semantic-commit-writer
![Static Badge](https://img.shields.io/badge/web%20based-blue?style=flat-square)
| ![Static Badge](https://img.shields.io/badge/VanillaJS-yellow?style=flat-square) | ![code size](https://img.shields.io/github/languages/code-size/2ood/semantic-commit-writer?style=flat-square) | ![GitHub License](https://img.shields.io/github/license/2ood/semantic-commit-writer?style=flat-square)

This website generates semantic commit messages easily. This generator generates on semantic commit message rule based on [conventional commits](https://www.conventionalcommits.org/).

[Check deployed version!](https://2ood.github.io/semantic-commit-writer)

![main](./img/main-page.png)

## Write your commit messages easily.
This generator is useful in following aspects:

1. **Follow commit conventions** : any other programmers can easily understand your commit.
2. **Keep commit concise** : using types only from given commit types makes our commit logs concise.
3. **Easy to use** : it is web-based, easy to use.
4. **markdown supported** : the description is written on markdown editor.
5. **fast, light-weight** : it is built with bootstrap5, and other codes are written in vanilla javascript. 
6. Lively deployed by **Github page**.

## How to use
### 1. Fill in the inputs.

Commit type and commit title is required. Other fields are optional.
If you check advanced mode, you can add more complex commit commands.

![main](./img/main-page.png)

### 2. Generate!

Once required fields are filled out, `generate` button will be enabled.
When you press it, a modal will pop up, showing the generated command.
You can copy the generated command with `Copy command` button.

![modal-opened](./img/modal-active.png) 

3. use it in CLI
Open the terminal in the directory you are working on (that's managed with git) and paste as follows
```bash
$ git add -A
$ ## paste what you copied ##
$ git push
```

## Used Tech / Dependencies
* [bootstrap5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
* [easy-markdown-editor](https://github.com/Ionaru/easy-markdown-editor)