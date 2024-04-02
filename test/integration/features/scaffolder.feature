Feature: Scaffolder

  Scenario: Scaffold a TypeScript project
    Given the project dialect is "typescript"
    When the project is scaffolded
    Then scripts are defined
    And dependencies are listed
    And a canary test file exists
    And vitest is configured using a "ts" extension

  Scenario: Scaffold an ESM project
    Given the project dialect is "esm"
    When the project is scaffolded
    Then scripts are defined
    And dependencies are listed
    And a canary test file exists
    And vitest is configured using a "js" extension
