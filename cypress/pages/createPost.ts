class CreatePost {
  visit() {
    cy.get("a[href='/web/index.php/buzz/viewBuzz']").click();
  }

  writePost(value: any) {
    const write = cy.get("textarea");
    write.type(value);
    return this;
  }

  submitPost() {
    const button = cy.get("button[type='submit'].oxd-button--main");
    button.click();
    return this;
  }
}

export default CreatePost;
