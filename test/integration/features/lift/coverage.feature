Feature: Enable Built-in Coverage

  Scenario: Enable built-in coverage
    Given vitest is configured for the project
    When the project is lifted
    Then built-in coverage should be enabled
