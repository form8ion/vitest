Feature: lift

  Scenario: lift
    Given vitest is configured for the project
    When the project is lifted
    Then jest-when is replaced with vitest-when
