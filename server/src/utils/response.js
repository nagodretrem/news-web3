class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }

  success(res) {
    return res.status(200).json({
      data: this.data,
      message: this.message ?? "Success",
    });
  }
  created(res) {
    return res.status(201).json({
      data: this.data,
      message: this.message ?? "Created",
    });
  }
  error500(res) {
    return res.status(500).json({
      data: this.data,
      message: this.message ?? "Internal Server Error",
    });
  }
  error400(res) {
    return res.status(400).json({
      data: this.data,
      message: this.message ?? "Bad Request",
    });
  }
  error401(res) {
    return res.status(400).json({
      data: this.data,
      message: this.message ?? "Unauthorized",
    });
  }
  error404(res) {
    return res.status(404).json({
      data: this.data,
      message: this.message ?? "Not Found",
    });
  }
  error429(res) {
    return res.status(429).json({
      data: this.data,
      message: this.message ?? "Too Many Requests",
    });
  }
}

module.exports = Response;
