import React, { Component } from "react";

export class ErrorBoundary extends Component {
  state = {
    error: null
  };

  static getDerivedStateFromError(error) {
    return {
      error
    };
  }

  clearError = () => {
    this.setState({ error: null });
  };

  render() {
    const fallback = this.props.fallback;
    const { error } = this.state;
    if (error) {
      return fallback(this.clearError);
    } else {
      return this.props.children;
    }
  }
}
