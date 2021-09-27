## NatWest Payments Challenge



A demo React project to list payments from a stub api to a bootstrap table.

## Design Considerations

The application has been designed to use a container component (PaymentsContainer) responsible for maintaining state and for fetching data from the api.

Inside the container component is another component (Payments) the simply displays the data. It was designed like this so that the two components could be tested separately.

The React code was written using the latest React function components style and hooks to maintain state.  This is as opposed to the "legacy" class components and lifecycle methods which I am more familiar with.

State in the application was maintained via React hooks as it didn't really warrant the use of Redux for such a small application.

#### Table Display

React Bootstrap was used for the table display.  

An alternative given more time would be to use an off-the-shelf table like [](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Column%20Filter&selectedStory=Text%20Filter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel)



## Accessibility

The page was checked with the Chrome browser axe tool. There was an issue with contrast on the Load More button which was fixed by overriding the bootstrap background colour.

## Release Notes

A couple of mis-spellings were corrected in the stub api application scripts.









