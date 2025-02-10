Feature: Detection Predicate

  Scenario: vitest not used in the project
    Given no vitest config file exists
    When checking for presence of vitest
    Then the vitest usage is not detected
