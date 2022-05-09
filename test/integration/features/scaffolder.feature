Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then scripts are defined
    And dependencies are listed
