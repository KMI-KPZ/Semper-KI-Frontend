// Main Program to Run JSX Component Analysis

const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const { traverseJSXElements, dotLines } = require('./jsx_component_analysis');

// Define directories to scan
const directoriesToScan = [
    path.join(__dirname, '../src'),
    path.join(__dirname, '../component-library'),
];

let components = {};
let processedLinks = new Set();
let definedComponents = new Set();

// Function to analyze a file in the first pass to collect custom components
function collectDefinedComponents(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = babel.parseSync(code, {
        sourceType: 'module',
        plugins: [
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-transform-typescript',
            '@babel/plugin-syntax-jsx',
            '@babel/plugin-syntax-flow'
        ],
        presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
        ],
        filename: path.basename(filePath),
    });

    traverse(ast, {
        FunctionDeclaration(funcPath) {
            if (funcPath.node.id && funcPath.node.id.name) {
                definedComponents.add(funcPath.node.id.name);
            }
        },
        VariableDeclarator(varPath) {
            if (varPath.node.id && varPath.node.id.name && varPath.node.init && (varPath.node.init.type === 'ArrowFunctionExpression' || varPath.node.init.type === 'FunctionExpression')) {
                definedComponents.add(varPath.node.id.name);
            }
        },
        ClassDeclaration(classPath) {
            if (classPath.node.id && classPath.node.id.name) {
                definedComponents.add(classPath.node.id.name);
            }
        },
    });
}

// Function to analyze a file in the second pass
function analyzeFile(filePath, importMappings, definedComponents) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = babel.parseSync(code, {
        sourceType: 'module',
        plugins: [
            '@babel/plugin-transform-react-jsx',
            '@babel/plugin-transform-typescript',
            '@babel/plugin-syntax-jsx',
            '@babel/plugin-syntax-flow'
        ],
        presets: [
            '@babel/preset-react',
            '@babel/preset-typescript'
        ],
        filename: path.basename(filePath),
    });

    traverse(ast, {
        ImportDeclaration(importPath) {
            const source = importPath.node.source.value;
            importPath.node.specifiers.forEach((specifier) => {
                importMappings[specifier.local.name] = source;
            });
        },
        VariableDeclaration(varPath) {
            traverseJSX(varPath, filePath, importMappings, definedComponents);
        },
        FunctionDeclaration(funcPath) {
            traverseJSX(funcPath, filePath, importMappings, definedComponents);
        },
        FunctionExpression(funcExprPath) {
            traverseJSX(funcExprPath, filePath, importMappings, definedComponents);
        },
        ArrowFunctionExpression(arrowFuncPath) {
            traverseJSX(arrowFuncPath, filePath, importMappings, definedComponents);
        },
        ClassDeclaration(classPath) {
            if (classPath.node.id && classPath.node.id.name && definedComponents.has(classPath.node.id.name)) {
                traverseJSXElements(classPath, classPath.node.id.name, filePath, importMappings, components, definedComponents);
            }
        },
    });
}

// Helper function for JSX Traversal
function traverseJSX(path, filePath, importMappings, definedComponents) {
    if (path.node.type === 'VariableDeclaration') {
        path.traverse({
            VariableDeclarator(innerPath) {
                const init = innerPath.node.init;
                if (init && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')) {
                    if (definedComponents.has(innerPath.node.id.name)) {
                        traverseJSXElements(innerPath, innerPath.node.id.name, filePath, definedComponents, importMappings, components);
                    }
                }
            },
        });
    } else if (
        path.node.type === 'FunctionDeclaration' &&
        path.node.id &&
        path.node.id.name &&
        definedComponents.has(path.node.id.name)
    ) {
        traverseJSXElements(path, path.node.id.name, filePath, importMappings, components, definedComponents);
    } else if (
        path.node.type === 'FunctionExpression' ||
        path.node.type === 'ArrowFunctionExpression'
    ) {
        const parent = path.findParent((p) => p.isVariableDeclarator());
        if (parent && parent.node.id && parent.node.id.name && definedComponents.has(parent.node.id.name)) {
            traverseJSXElements(path, parent.node.id.name, filePath, importMappings, components, definedComponents);
        }
    } else if (path.node.type === 'ClassDeclaration' && path.node.id && path.node.id.name && definedComponents.has(path.node.id.name)) {
        traverseJSXElements(path, path.node.id.name, filePath, importMappings, components, definedComponents);
    }
}

// Function to analyze a directory recursively
function analyzeDirectory(dirPath, pass, definedComponents) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            analyzeDirectory(filePath, pass, definedComponents);
        } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))) {
            if (pass === 1) {
                collectDefinedComponents(filePath);
            } else if (pass === 2) {
                const importMappings = {};
                analyzeFile(filePath, importMappings, definedComponents);
            }
        }
    });
}

// Initialize the analysis
console.log('Starting JSX Component Analysis (Pass 1)...');
directoriesToScan.forEach((dir) => {
    analyzeDirectory(dir, 1, definedComponents);
});

// Log defined components after pass 1
// console.log('Defined Components:', Array.from(definedComponents));
for (let component of definedComponents) {
    console.log('Defined Component:', component);
}

console.log('Starting JSX Component Analysis (Pass 2)...');
directoriesToScan.forEach((dir) => {
    analyzeDirectory(dir, 2, definedComponents);
});

// Write results to components.json
const componentsOutputPath = path.join(__dirname, 'components.json');
fs.writeFileSync(componentsOutputPath, JSON.stringify(components, null, 2));
console.log(`Analysis complete. Results written to: ${componentsOutputPath}`);

// Write the DOT file for visualization
const dotOutputPath = path.join(__dirname, 'components.dot');
fs.writeFileSync(dotOutputPath, `digraph G {
${dotLines.join('\n')}
}`);
console.log(`DOT file written to: ${dotOutputPath}`);

const { analyzeNavigation } = require('./navigation_analyzer');
const navigationOutputPath = path.join(__dirname, 'navigate.dot');
analyzeNavigation(components, navigationOutputPath);
console.log(`Navigation analysis written to: ${navigationOutputPath}`);