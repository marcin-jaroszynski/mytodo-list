export class Task {
  id: string;
  title: string;
  content: string;
  status: string;
  date_created: Date;
  date_finished: Date;
  date_due: Date;


  constructor(task) {
    this.id = task.id;
    this.title = task.title;
    this.content = task.content;
    this.date_created = task.date_created;
    this.date_finished = task.date_finished;
    this.date_due = task.date_due;
    this.status = task.status;
  }

  isFinished(): boolean {
    return (this.status === 'finished') ? true : false;
  }

  static get Builder() {
    class Builder {
      id: string;
      title: string;
      content: string;
      status: string;
      date_created: Date;
      date_finished: Date;
      date_due: Date;

      setId(id) {
        this.id = id;
        return this;
      }

      setTitle(title) {
        this.title = title;
        return this;
      }

      setContent(content) {
        this.content = content;
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

      setDateDue(dateDue) {
        this.date_due = new Date(dateDue);
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
