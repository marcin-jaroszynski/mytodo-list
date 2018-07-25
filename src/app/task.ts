export class Task {
  id: string;
  title: string;
  status: string;
  date_created: Date;
  date_finished: Date;


  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.date_created = task.date_created;
    this.date_finished = task.date_finished;
    this.status = task.status;
  }

  isFinished(): boolean {
    return (this.status=='finished') ? true : false;
  }

  static get Builder() {
    class Builder {
      id: string;
      title: string;
      status: string;
      date_created: Date;
      date_finished: Date;

      setId(id) {
        this.id = id;
        return this;
      }

      setTitle(title) {
        this.title = title;
        return this;
      }

      setDateCreated(dateCreated) {
        this.date_created = dateCreated;
        return this;
      }

      setDateFinished(dateFinished) {
        this.date_finished = dateFinished;
        return this;
      }

      setStatus(status) {
        this.status = status;
        return this;
      }

      build() {
        return new Task(this);
      }
    }
    return Builder;
  }
}
