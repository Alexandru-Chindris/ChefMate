<Page loginScreen>
    <LoginScreenTitle>Framework7</LoginScreenTitle>
    <List form>
      <ListInput
        label="Username"
        type="text"
        placeholder="Your username"
        value={username}
        onInput={(e) => (username = e.target.value)}
      />
      <ListInput
        label="Password"
        type="password"
        placeholder="Your password"
        value={password}
        onInput={(e) => (password = e.target.value)}
      />
    </List>
    <List inset>
      <ListButton onClick={signIn}>Sign In</ListButton>
    </List>
    <BlockFooter>
      Some text about login information.<br />Lorem ipsum dolor sit amet, consectetur adipiscing
      elit.
    </BlockFooter>
  </Page>

<script>
import {Page,List , LoginScreenTitle, ListInput, BlockFooter, ListButton  } from 'framework7-svelte';

let username = '';
let password = '';

  function signIn() {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
    });
}
</script>