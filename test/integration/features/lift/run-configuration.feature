Feature: JetBrains Run Configuration

  Scenario: maintaining with a JetBrains editor
    Given vitest is configured for the project
    And a JetBrains editor is used to maintain the project
    When the project is lifted
    Then a JetBrains run-configuration is created for unit-testing with vitest

  Scenario: no JetBrains editor in use
    Given vitest is configured for the project
    When the project is lifted
    Then a JetBrains run-configuration is not created for unit-testing with vitest
