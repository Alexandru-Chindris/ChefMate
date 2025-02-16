<Page class="register-page">
    <Navbar>Register</Navbar>
    <Block class="container-register">
      <List strongIos dividersIos insetIos>
        <ListInput outline label="Username" floatingLabel type="text" placeholder="Your username" clearButton>
          <i class="icon demo-list-icon" slot="media" />
        </ListInput>
  
        <ListInput
        outline
        label="E-mail"
        floatingLabel
        type="email"
        placeholder="Your e-mail"
        clearButton
      >
        <i class="icon demo-list-icon" slot="media" />
      </ListInput>
  
        <ListInput
          outline
          label="Password"
          floatingLabel
          type="password"
          placeholder="Your password"
          clearButton
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListInput>
  
        <ListInput
          outline
          label="Phone"
          floatingLabel
          type="tel"
          placeholder="Your phone number"
          clearButton
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListInput>
  
        <ListInput
          outline
          label="Bio"
          floatingLabel
          type="textarea"
          resizable
          placeholder="Bio"
          clearButton
        >
          <i class="icon demo-list-icon" slot="media" />
        </ListInput>
      </List>
    </Block>
</Page>

<script>
    import { Navbar, Page, Block, List, ListInput } from 'framework7-svelte';
    import '../css/register.css';
</script>
  