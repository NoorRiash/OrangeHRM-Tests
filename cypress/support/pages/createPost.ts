class CreatePost {
  static write = "textarea";
  static button = "button[type='submit'].oxd-button--main";

  static visit() {
    cy.get("a[href='/web/index.php/buzz/viewBuzz']").click();
  }

  static writePost(value: string) {
    cy.get(this.write).type(value);
  }

  static submitPost() {
    cy.get(this.button).click();
  }
}

export default CreatePost;
