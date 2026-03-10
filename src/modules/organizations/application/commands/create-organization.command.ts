export class CreateOrganizationCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly createdBy: string,
  ) {}
}
