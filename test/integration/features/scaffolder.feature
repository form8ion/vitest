Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then scripts are defined
    And dependencies are listed
    And a canary test file exists
    And vitest is configured
