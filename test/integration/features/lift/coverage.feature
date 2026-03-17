Feature: Enable Built-in Coverage

  Scenario: Enable built-in coverage
    Given vitest is configured for the project
    When the project is lifted
    Then built-in coverage should be enabled

  Scenario: Switch from c8 to built-in coverage
    Given vitest is configured for the project
    And c8 is currently configured to collect coverage
    When the project is lifted
    Then c8 should be removed
    And built-in coverage should be enabled
