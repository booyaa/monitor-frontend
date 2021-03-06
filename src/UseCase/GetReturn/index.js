export default class GetReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let {success, foundReturn} = await this.returnGateway.findById(request.id);
    if (success) {
      presenter.presentReturn(foundReturn);
    } else {
      presenter.presentReturnNotFound();
    }
  }
}
