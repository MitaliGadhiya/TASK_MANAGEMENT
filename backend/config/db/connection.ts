import { connect } from 'mongoose'

export class Connection {
  public async connections(): Promise<void> {
    return connect("mongodb+srv://mitaligadhiya6:gJL3EHi02xY8dFnc@mitali.quytpq9.mongodb.net/TASK_MANAGEMENT?retryWrites=true&w=majority&appName=Mitali")
      .then(() => {
        console.log("connection established")
      })
      .catch((error: Error) => {
        // throw error;
        console.log(error)
      })
  }
}
