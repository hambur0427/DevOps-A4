"""A8 Task 1 + Task 2: console and OTLP trace export."""
import argparse
from opentelemetry import trace
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--mode", choices=["console", "otlp"], default="console")
    parser.add_argument("--endpoint", default="http://localhost:4317")
    args = parser.parse_args()
    provider = TracerProvider(resource=Resource.create({"service.name": "a8-checkout-demo"}))
    if args.mode == "console":
        provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
    else:
        from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
        provider.add_span_processor(BatchSpanProcessor(
            OTLPSpanExporter(endpoint=args.endpoint, insecure=True)))
    trace.set_tracer_provider(provider)
    tracer = trace.get_tracer("a8.demo")
    with tracer.start_as_current_span("checkout") as parent:
        parent.set_attribute("app.operation", "checkout")
        with tracer.start_as_current_span("charge-card") as child:
            child.set_attribute("payment.status", "demo-success")
            print("paid (demo only)")
            print(f"trace_id={child.get_span_context().trace_id:032x}")
            print(f"parent_span_id={parent.get_span_context().span_id:016x}")
            print(f"child_span_id={child.get_span_context().span_id:016x}")
    provider.force_flush(timeout_millis=10000)
    provider.shutdown()

if __name__ == "__main__":
    main()
